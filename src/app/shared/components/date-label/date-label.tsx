import { Colors } from '@shared/models/colors.models';
import { formateISODate } from '@shared/utils/general.utils';
import { Calendar } from 'lucide-react';

interface DateLabelProps {
  date: string;
}

const DateLabel = ({ date }: DateLabelProps) => {
  return (
    <div className="flex gap-2 items-center">
      <Calendar size={16} color={Colors.secondary} />
      <time dateTime={date} className="text-xs text-secondary">
        {formateISODate(date)}
      </time>
    </div>
  );
};

DateLabel.displayName = 'Date';

export default DateLabel;
