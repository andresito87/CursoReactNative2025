import { Navigator } from './presentation/navigator/Navigator';
import { ThemeProvider } from './presentation/context/ThemeContext';

export const ComponentsApp = () => {

  return (
    <ThemeProvider>
      <Navigator />
    </ThemeProvider>
  );
};

export default ComponentsApp;