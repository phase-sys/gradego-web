import React from 'react';
import { useClassStore } from '@/store/classStore';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users } from 'lucide-react';

const ClassSwitcher: React.FC = () => {
  const { classes, activeClassId, setActiveClass } = useClassStore();
  
  const activeClass = classes.find(c => c.id === activeClassId);
  const availableClasses = classes.filter(c => !c.isArchived);

  if (availableClasses.length === 0) {
    return <span className="text-sm text-muted-foreground">No Active Classes</span>;
  }

  return (
    <Select 
      value={activeClassId.toString()} 
      onValueChange={(value) => setActiveClass(parseInt(value))}
    >
      <SelectTrigger className="w-[180px] h-8">
        <Users className="h-4 w-4 mr-2 text-primary" />
        <SelectValue placeholder="Select Class" />
      </SelectTrigger>
      <SelectContent>
        {availableClasses.map(cls => (
          <SelectItem key={cls.id} value={cls.id.toString()}>
            {cls.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ClassSwitcher;