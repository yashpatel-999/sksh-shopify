import {createContext, useContext, useMemo, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';

const ToastContext = createContext(null);

export function ToastProvider({children}) {
  const [toasts, setToasts] = useState([]);

  const api = useMemo(
    () => ({
      showToast(message, tone = 'neutral') {
        const id = crypto.randomUUID();
        setToasts((current) => [...current, {id, message, tone}]);
        window.setTimeout(() => {
          setToasts((current) => current.filter((toast) => toast.id !== id));
        }, 3500);
      },
    }),
    [],
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="toast-viewport" aria-live="polite" aria-atomic="true">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              className={`toast toast-${toast.tone}`}
              initial={{opacity: 0, y: 20, scale: 0.98}}
              animate={{opacity: 1, y: 0, scale: 1}}
              exit={{opacity: 0, y: 12, scale: 0.98}}
              transition={{duration: 0.25}}
            >
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}