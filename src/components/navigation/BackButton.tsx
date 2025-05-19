
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  className?: string;
}

const BackButton = ({ className }: BackButtonProps) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Go back to the previous page in history
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className={className} 
      onClick={goBack}
      aria-label="Go back"
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      Back
    </Button>
  );
};

export default BackButton;
