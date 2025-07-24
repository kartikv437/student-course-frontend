import { useState, useCallback } from 'react';

export type ValidatorFn<Value, Values> = (value: Value, values: Values) => string | undefined;
export type Validators<T> = Partial<Record<keyof T, ValidatorFn<any, T>[]>>;

export interface UseFormValidationOptions {
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

export interface UseFormValidationReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isValid: boolean;
  setFieldValue: <K extends keyof T>(field: K, value: T[K]) => void;
  setValues: (vals: T) => void;
  resetForm: (nextValues?: T) => void;
  validateField: <K extends keyof T>(field: K) => string | undefined;
  validateForm: () => Partial<Record<keyof T, string>>;
  handleChange: <K extends keyof T>(field: K) => (value: T[K]) => void;
  /** Ionic v5 friendly: accept any CustomEvent shape */
  handleIonChange: <K extends keyof T>(field: K) => (e: any) => void;
  handleBlur:   <K extends keyof T>(field: K) => () => void;
  handleIonBlur: <K extends keyof T>(field: K) => (e: any) => void;
  handleSubmit: (onValid: (values: T) => void | Promise<void>) => (e?: React.FormEvent) => Promise<void>;
  getFirstError: (errs?: Partial<Record<keyof T, string>>) => string | undefined;
}

export function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
  validators: Validators<T>,
  {
    validateOnChange = false,
    validateOnBlur = true,
  }: UseFormValidationOptions = {}
): UseFormValidationReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const runValidators = useCallback(<K extends keyof T>(field: K, value: T[K]): string | undefined => {
    const rules = validators[field] || [];
    for (const rule of rules) {
      const maybeError = rule(value, values);
      if (maybeError) return maybeError;
    }
    return undefined;
  }, [validators, values]);

  const validateField = useCallback<<K extends keyof T>(field: K) => string | undefined>((field) => {
    const err = runValidators(field, values[field]);
    setErrors(prev => ({ ...prev, [field]: err }));
    return err;
  }, [runValidators, values]);

const validateForm = useCallback(() => {
  const nextErrors: Partial<Record<keyof T, string>> = {};
  (Object.keys(values) as (keyof T)[]).forEach((field) => {
    const err = runValidators(field, values[field]);
    if (err) nextErrors[field] = err;
  });

  setErrors(nextErrors);
  console.log("Validation errors:", nextErrors); // <-- use nextErrors

  return nextErrors; // <-- return it
}, [runValidators, values]);

  const setFieldValue = useCallback<<K extends keyof T>(field: K, value: T[K]) => void>((field, value) => {
    setValues(prev => ({ ...prev, [field]: value }));
    if (validateOnChange) {
      const err = runValidators(field, value);
      setErrors(prev => ({ ...prev, [field]: err }));
    }
  }, [validateOnChange, runValidators]);

  const handleChange = useCallback<<K extends keyof T>(field: K) => (value: T[K]) => void>((field) => (value) => {
    setFieldValue(field, value);
  }, [setFieldValue]);

  const handleIonChange = useCallback<<K extends keyof T>(field: K) => (e: any) => void>((field) => (e: any) => {
    const value = e?.detail?.value as T[typeof field];
    setFieldValue(field, value);
  }, [setFieldValue]);

  const markTouched = useCallback<<K extends keyof T>(field: K) => void>((field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  }, []);

  const handleBlur = useCallback<<K extends keyof T>(field: K) => () => void>((field) => () => {
    markTouched(field);
    if (validateOnBlur) validateField(field);
  }, [markTouched, validateOnBlur, validateField]);

  const handleIonBlur = useCallback<<K extends keyof T>(field: K) => (e: any) => void>((field) => (_e: any) => {
    markTouched(field);
    if (validateOnBlur) validateField(field);
  }, [markTouched, validateOnBlur, validateField]);

  const handleSubmit = useCallback((onValid: (values: T) => void | Promise<void>) => {
    return async (e?: React.FormEvent) => {
      e?.preventDefault?.();
      const ok = validateForm();
      if (!ok) return;
      await onValid(values);
    };
  }, [validateForm, values]);

  const resetForm = useCallback((nextValues?: T) => {
    setValues(nextValues ?? initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

const getFirstError = useCallback(
  (errs?: Partial<Record<keyof T, string>>) => {
    const toScan = errs ?? errors;
    const firstKey = (Object.keys(toScan) as (keyof T)[]).find(k => !!toScan[k]);
    return firstKey ? toScan[firstKey] : undefined;
  },
  [errors]
);

  const isValid = Object.values(errors).every(v => !v);

  return {
    values,
    errors,
    touched,
    isValid,
    setFieldValue,
    setValues,
    resetForm,
    validateField,
    validateForm,
    handleChange,
    handleIonChange,
    handleBlur,
    handleIonBlur,
    handleSubmit,
    getFirstError,
  };
}

/* -----------------------
 * Helper validators
 * --------------------- */
export const required = (msg: string) =>
  <T>(v: T) => (v === null || v === undefined || v === '' ? msg : undefined);

export const pattern = (re: RegExp, msg: string) =>
  (v: string) => (v && !re.test(v) ? msg : undefined);

export const minLength = (len: number, msg: string) =>
  (v: string) => (v && v.length < len ? msg : undefined);
