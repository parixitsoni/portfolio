import React from 'react';
import { Typography } from './Typography';
import { Badge } from './Badge';

export const SectionHeader = ({ 
  title, 
  subtitle, 
  badge, 
  badgeIcon: Icon,
  className = '' 
}) => {
  return (
    <header className={`mb-12 animate-fadeInUp ${className}`}>
      {badge && (
        <Badge variant="sky" icon={Icon} className="mb-6">
          {badge}
        </Badge>
      )}
      <Typography variant="h1" className="mb-4">
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" color="secondary">
          {subtitle}
        </Typography>
      )}
    </header>
  );
};
