import React, { useEffect, useState } from 'react';
import Button from '@/components/Button/Button';
import TimerPlayIcon from '@/components/Icons/TimerPlayIcon';
import TimerResetIcon from '@/components/Icons/TimerResetIcon';
import TimerPauseIcon from '@/components/Icons/TimerPauseIcon';

export default function DashboardTimer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);

  const startAndStop = () => {
    setIsRunning(!isRunning);
  };
  const reset = () => {
    setTime(0);
  };
  return (
    <>
      <div
        className={
          'flex items-center gap-2 max-laptop:fixed bottom-0 right-0 max-laptop:px-3 max-laptop:py-2 max-laptop:bg-accentColorLight max-laptop:rounded-tl-16'
        }
      >
        <div
          className={
            'flex gap-1.5 text-white text-16 leading-125 bg-white/[0.08] border border-white/[0.24] rounded-90 px-4 py-2.5 min-w-[124px] max-laptop:px-2 max-laptop:py-1.5 max-laptop:text-14 max-laptop:min-w-[100px]'
          }
        >
          <span>{hours.toString().padStart(2, '0')}</span>
          <span>:</span>
          <span>{minutes.toString().padStart(2, '0')}</span>
          <span>:</span>
          <span>{seconds.toString().padStart(2, '0')}</span>
        </div>
        <Button
          type={'button'}
          variant={'custom'}
          className={
            'w-10 h-10 max-laptop:w-7 max-laptop:h-7 max-laptop:[&_svg]:h-4 max-laptop:[&_svg]:w-4 border border-white/[0.24] flex items-center justify-center rounded-full'
          }
          title={isRunning ? 'Stop Timer' : 'Start Timer'}
          onClick={startAndStop}
        >
          {isRunning ? <TimerPauseIcon /> : <TimerPlayIcon />}
        </Button>
        <Button
          type={'button'}
          variant={'custom'}
          onClick={() => {
            reset();
            setIsRunning(false);
          }}
          title={'Reset Timer'}
          className={
            'w-10 h-10 max-laptop:w-7 max-laptop:h-7 max-laptop:[&_svg]:h-4 max-laptop:[&_svg]:w-4 border border-white/[0.24] flex items-center justify-center rounded-full'
          }
        >
          <TimerResetIcon />
        </Button>
      </div>
      <span className={'h-8 border-r border-white/[0.24] max-laptop:hidden'} />
    </>
  );
}
