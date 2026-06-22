import type { ComponentType, SVGProps } from 'react';

import CameraIcon from '@/assets/icons/cameras.svg?react';
import ShieldIcon from '@/assets/icons/plan.svg?react';
import SensorIcon from '@/assets/icons/sensors.svg?react';
import ProtectionIcon from '@/assets/icons/protection.svg?react';

export interface StepIconProps {
  name: string;
  className?: string;
}

const ICON_COMPONENTS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  camera: CameraIcon,
  shield: ShieldIcon,
  sensor: SensorIcon,
  protection: ProtectionIcon,
};

export function StepIcon({ name, className }: StepIconProps) {
  const Icon = ICON_COMPONENTS[name] ?? ShieldIcon;

  return <Icon className={className} aria-hidden="true" />;
}
