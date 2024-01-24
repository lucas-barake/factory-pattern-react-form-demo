"use client";
import { type FC } from "react";
import { Transition } from "@headlessui/react";
import { resolveValue, Toaster, ToastIcon } from "react-hot-toast";

export const StyledToaster: FC = () => (
  <Toaster position="top-center" containerClassName="mb-16">
    {(t) => (
      <Transition
        appear
        show={t.visible}
        className="mb-2 flex max-w-lg items-center gap-3 rounded-md border border-border bg-background px-4 py-2 text-foreground"
        enter="transition-all duration-150"
        enterFrom="opacity-0 scale-50"
        enterTo="opacity-100 scale-100"
        leave="transition-all duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-75"
      >
        <ToastIcon toast={t} />
        {resolveValue(t.message, t)}
      </Transition>
    )}
  </Toaster>
);
