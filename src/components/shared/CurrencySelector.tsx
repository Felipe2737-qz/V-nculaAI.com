import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useApp } from '@/contexts/AppContext';
import { DollarSign } from 'lucide-react';

const currencies = [
  { value: 'USD', label: 'USD ($)' },
  { value: 'BRL', label: 'BRL (R$)' },
  { value: 'EUR', label: 'EUR (€)' },
  { value: 'GBP', label: 'GBP (£)' },
] as const;

export function CurrencySelector() {
  const { currency, setCurrency } = useApp();

  return (
    <Select value={currency} onValueChange={(val) => setCurrency(val as typeof currency)}>
      <SelectTrigger className="w-full md:w-[120px]">
        <DollarSign className="w-4 h-4 mr-2" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((curr) => (
          <SelectItem key={curr.value} value={curr.value}>
            {curr.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
