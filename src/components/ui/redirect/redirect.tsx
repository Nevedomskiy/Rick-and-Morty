import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export const Redirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/'); // Перенаправляем на главную страницу
  }, [navigate]);

  return null; // Компонент ничего не отрисовывает
};
