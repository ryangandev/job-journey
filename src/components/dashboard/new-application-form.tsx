'use client';

import { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Button,
  Input,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Checkbox,
  Progress,
} from '@nextui-org/react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdRefresh, IoMdArrowBack, IoMdArrowForward } from 'react-icons/io';
import { FaCheck } from 'react-icons/fa6';
import toast from 'react-hot-toast';

import useConfirmModal from '../../hooks/use-confirm-modal';
import { ChevronDownIcon } from '../../assets/svgs';
import { NewApplicationFormSchema } from '../../schemas/application-schema';
import { addNewApplicationAction } from '../../actions/applications-actions';
import { newApplicationFormQuestions } from '../../data/new-application-form';
import { jobLevelMap, jobSettingMap, jobTypeMap } from '../../data/application';
import {
  NewApplicationFormQuestion,
  InputQuestionKey,
  SelectQuestionKey,
  CheckboxQuestionKey,
} from '../../models/new-application-form';
import {
  inputTransition,
  inputTransitionVariants,
  shakeAnimationVariants,
} from '../../constants/framer-motion-variants-transitions';

type NewApplicationFormProps = {
  userId: string;
};

export default function NewApplicationForm({
  userId,
}: NewApplicationFormProps) {
  const {
    handleSubmit,
    register,
    control,
    formState: { isSubmitting, isDirty },
    getFieldState,
    reset,
  } = useForm<z.infer<typeof NewApplicationFormSchema>>({
    resolver: zodResolver(NewApplicationFormSchema),
    defaultValues: {
      userId: userId,
      title: '',
      company: '',
      location: '',
      setting: 'on_site',
      type: 'full_time',
      level: 'junior',
      salary: '',
      jobPostingLink: '',
      isFavorite: false,
    },
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [animateDirection, setAnimateDirection] = useState(1); // 1: next, -1: previous
  const [showShakeAnimation, setShowShakeAnimation] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { onOpen, setTitle, setQuestion, setAction } = useConfirmModal();

  const handleStartNewRequest = () => {
    if (!isDirty) return;

    const handleStartNew = () => {
      reset();
      setCurrentQuestionIndex(0);
      setAnimateDirection(-1);
      toast.success('Form has been reset.');
    };

    setTitle('Start New Application?');
    setQuestion(
      'There are unsaved changes. Are you sure to start a new application?',
    );
    setAction(() => handleStartNew);
    onOpen();
  };

  const handleOnPrevious = () => {
    setCurrentQuestionIndex((prev) => prev - 1);
    setAnimateDirection(-1);
  };

  const handleOnNext = () => {
    const isCurrentQuestionModified = getFieldState(
      newApplicationFormQuestions[currentQuestionIndex].key,
    ).isDirty;

    if (
      !isCurrentQuestionModified &&
      newApplicationFormQuestions[currentQuestionIndex].required
    ) {
      toast.error('Please fill in the required field.', {
        duration: 2000,
      });
      setShowShakeAnimation(true);
      inputRef.current?.focus();
      return;
    }

    // Prevent moving to the next question if the current question is the last question
    if (currentQuestionIndex === newApplicationFormQuestions.length - 1) {
      return;
    }

    // Move to the next question
    setCurrentQuestionIndex((prev) => prev + 1);
    setAnimateDirection(1);
  };

  const renderInputQuestion = (
    key: InputQuestionKey,
    isRequired: boolean,
    placeholder: string,
  ) => {
    const { ref, ...rest } = register(key, { required: isRequired }); // Register function sets up the ref so we cannot directly use ref={inputRef} as that will override the ref setup by register

    return (
      <motion.div
        className="w-full"
        variants={shakeAnimationVariants}
        animate={showShakeAnimation ? 'shake' : 'static'}
        onAnimationComplete={() => setShowShakeAnimation(false)}
        key={key}
      >
        <Input
          {...rest}
          ref={(e) => {
            ref(e); // Register input with react-hook-form
            (inputRef.current as any) = e; // This ignores the typescript error
          }}
          name={key}
          variant="bordered"
          size="lg"
          color={showShakeAnimation ? 'danger' : 'default'}
          placeholder={placeholder}
          autoFocus={true}
          autoComplete="off"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleOnNext();
            }
          }}
        />
      </motion.div>
    );
  };

  const renderSelectQuestion = (key: SelectQuestionKey, options: string[]) => {
    const typeMaps = {
      setting: jobSettingMap,
      type: jobTypeMap,
      level: jobLevelMap,
    };

    const currentMap = typeMaps[key];

    if (!currentMap || options.length === 0) {
      return null;
    }

    return (
      <Controller
        key={key}
        name={key}
        control={control}
        render={({ field }) => (
          <Dropdown>
            <DropdownTrigger>
              <Button
                size="md"
                endContent={<ChevronDownIcon />}
                variant="flat"
                color="warning"
              >
                {currentMap[field.value]}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              variant="bordered"
              disallowEmptySelection
              aria-label={`Select ${key}`}
              closeOnSelect={true}
              selectedKeys={[field.value]}
              selectionMode="single"
              onSelectionChange={(selectedKeys) => {
                const selectedKey = Array.from(selectedKeys)[0];
                field.onChange(selectedKey);
              }}
            >
              {options.map((option) => (
                <DropdownItem key={option}>{currentMap[option]}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        )}
      />
    );
  };

  const renderCheckboxQuestion = (
    key: CheckboxQuestionKey,
    placeholder: string,
  ) => {
    return (
      <Controller
        key={key}
        name={key}
        control={control}
        render={({ field }) => (
          <Checkbox
            className="text-sm text-light-100 dark:text-dark-100"
            isSelected={field.value}
            size="lg"
            color="danger"
            onValueChange={(value) => {
              field.onChange(value);
            }}
          >
            {placeholder}
          </Checkbox>
        )}
      />
    );
  };

  const renderQuestion = (question: NewApplicationFormQuestion) => {
    switch (question.type) {
      case 'input': {
        const { key, required, placeholder } = question;
        const inputQuestionComponent = renderInputQuestion(
          key as InputQuestionKey,
          required,
          placeholder ?? '',
        );
        return inputQuestionComponent;
      }
      case 'select': {
        const { key, options } = question;
        const selectQuestionComponent = renderSelectQuestion(
          key as SelectQuestionKey,
          options ?? [],
        );
        return selectQuestionComponent;
      }
      case 'checkbox': {
        const { key, placeholder } = question;
        const checkboxQuestionComponent = renderCheckboxQuestion(
          key as CheckboxQuestionKey,
          placeholder ?? '',
        );
        return checkboxQuestionComponent;
      }
      default:
        return null;
    }
  };

  const onSubmit = async (values: z.infer<typeof NewApplicationFormSchema>) => {
    // 1. Prevent form submission if the current question is not the last question
    if (currentQuestionIndex !== newApplicationFormQuestions.length - 1) {
      return; // Exit early
    }

    // 2. Client-side validation
    const result = NewApplicationFormSchema.safeParse(values);

    if (!result.success) {
      let errorMessages = '';

      result.error.issues.forEach((issue) => {
        errorMessages += issue.path[0] + ': ' + issue.message + '.\n';
      });

      toast.error(errorMessages);
      return;
    }

    // 3. Submit the application form using server action
    const response = await addNewApplicationAction(result.data);

    // 4. Show error message if there is any
    if (response?.error) {
      toast.error(response.error);
      return;
    }

    // 5. If success, show success message
    toast.success('Application added successfully!');
  };

  return (
    <AnimatePresence>
      <div className="flex w-full max-w-[36rem] flex-col space-y-12">
        <motion.form
          className="flex w-full flex-col space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          key={currentQuestionIndex}
          custom={animateDirection}
          variants={inputTransitionVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={inputTransition}
        >
          {/* Question */}
          <span className="text-lg font-semibold text-light-100 dark:text-dark-100">
            {currentQuestionIndex + 1}.{' '}
            {newApplicationFormQuestions[currentQuestionIndex].question}
            {newApplicationFormQuestions[currentQuestionIndex].required && (
              <span className="text-red-500"> *</span>
            )}
          </span>

          {/* Input Field */}
          <div className="flex h-16 items-center">
            {renderQuestion(newApplicationFormQuestions[currentQuestionIndex])}
          </div>

          {/* Button Group */}
          <div className="flex flex-row items-center justify-between">
            <Button
              size="md"
              radius="sm"
              variant="flat"
              endContent={<IoMdRefresh />}
              color="danger"
              onPress={handleStartNewRequest}
              isDisabled={!isDirty || isSubmitting}
            >
              Start New
            </Button>
            <div className="flex items-center space-x-4">
              <Button
                size="md"
                radius="sm"
                variant="flat"
                startContent={<IoMdArrowBack />}
                color="secondary"
                onPress={handleOnPrevious}
                isDisabled={currentQuestionIndex === 0 || isSubmitting}
              >
                Previous
              </Button>
              {currentQuestionIndex ===
              newApplicationFormQuestions.length - 1 ? (
                <Button
                  size="md"
                  radius="sm"
                  variant="flat"
                  endContent={<FaCheck />}
                  color="success"
                  type="submit"
                  isLoading={isSubmitting}
                  isDisabled={isSubmitting}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  size="md"
                  radius="sm"
                  variant="flat"
                  endContent={<IoMdArrowForward />}
                  color="primary"
                  onPress={handleOnNext}
                  isDisabled={
                    currentQuestionIndex ===
                      newApplicationFormQuestions.length - 1 || isSubmitting
                  }
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </motion.form>

        {/* Progress Section */}
        <motion.div
          className="w-full"
          variants={inputTransitionVariants}
          custom={0} // direction
          initial="enter"
          animate="center"
          exit="exit"
          transition={inputTransition}
        >
          <Progress
            size="sm"
            radius="md"
            classNames={{
              track: 'drop-shadow-md border border-default',
              indicator: 'bg-gradient-to-r from-pink-500 to-yellow-500',
              label: 'tracking-wider font-medium text-default-600',
              value: 'text-foreground/60',
            }}
            label="Completion"
            value={
              ((currentQuestionIndex + 1) /
                newApplicationFormQuestions.length) *
              100
            }
            showValueLabel={true}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
