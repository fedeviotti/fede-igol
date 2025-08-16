import { format, parse } from 'date-fns';

export const formatItalianDate = (value: string): string => {
  if (!value) return '';
  // value con formato 'yyyy-MM-dd'
  const parsedDate = parse(value, 'yyyy-MM-dd', new Date());
  // Formattazione in 'dd/MM/yyyy'
  return format(parsedDate, 'dd/MM/yyyy');
};
