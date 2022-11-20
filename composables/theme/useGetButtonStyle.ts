import { cva, type VariantProps } from "class-variance-authority";

declare global {
  type ButtonProps = VariantProps<typeof button>;
}

const button = cva(
  "px-6 py-3 relative group transition-all duration-300 hover:bg-opacity-50",
  {
    variants: {
      intent: {
        primary: "bg-primary-default",
        secondary: "bg-secondary-default"
      }
    },
    defaultVariants: {
      intent: "primary"
    }
  }
);
export const useGetButtonStyle = (params: ButtonProps) => {
  return button({ intent: params.intent });
};
