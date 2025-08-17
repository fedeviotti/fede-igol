import { addDays, format, isBefore, isWithinInterval, parse, startOfDay } from 'date-fns';

export const formatItalianDate = (value: string): string => {
  if (!value) return '';
  // value con formato 'yyyy-MM-dd'
  const parsedDate = parse(value, 'yyyy-MM-dd', new Date());
  // Formattazione in 'dd/MM/yyyy'
  return format(parsedDate, 'dd/MM/yyyy');
};

export const checkExpirationStatus = (
  dateString: string | undefined,
  format: string = 'yyyy-MM-dd'
): 'expired' | 'expiringSoon' | 'valid' => {
  console.log('dateString', dateString);
  if (!dateString) return 'valid';
  const date = parse(dateString, format, new Date());
  const today = startOfDay(new Date());
  const oneWeekFromNow = addDays(today, 7);

  if (isBefore(date, today)) {
    return 'expired';
  }

  if (isWithinInterval(date, { start: today, end: oneWeekFromNow })) {
    return 'expiringSoon';
  }

  return 'valid'; // after next week
};
