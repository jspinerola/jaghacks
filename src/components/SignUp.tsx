import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import axios from "axios";

// Mock API function - replace this with your actual Mailchimp API endpoint later
async function subscribeToMailchimp(email: string): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock validation - reject obviously invalid emails
  if (!email.includes("@") || !email.includes(".")) {
    throw new Error("Please enter a valid email address");
  }

  // Mock API call - replace with actual Mailchimp endpoint
  // Example: await axios.post('/api/mailchimp/subscribe', { email });

  // Simulate random failures for testing (10% failure rate)
  if (Math.random() < 0.1) {
    throw new Error("Unable to subscribe. Please try again later.");
  }

  // Success - in real implementation, this would be the actual API response
  return Promise.resolve();
}

interface FormData {
  email: string;
}

function SignUp() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<FormData>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      await subscribeToMailchimp(data.email);
      setSubmitSuccess(true);
      form.reset();

      // Close dialog after 2 seconds on success
      setTimeout(() => {
        setIsOpen(false);
        setSubmitSuccess(false);
      }, 2000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setSubmitError(
          error.response?.data?.message ||
            error.message ||
            "An error occurred. Please try again."
        );
      } else if (error instanceof Error) {
        // Handle other errors
        setSubmitError(error.message);
      } else {
        setSubmitError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset form and states when dialog closes
      form.reset();
      setSubmitError(null);
      setSubmitSuccess(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button className="w-full md:w-fit">Sign Up for Updates</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Receive Updates for JagHacks</DialogTitle>
          </DialogHeader>
          <form
            id="email-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                }}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="email-form-input">Email</FieldLabel>
                    <Input
                      id="email-form-input"
                      {...field}
                      type="email"
                      disabled={isSubmitting || submitSuccess}
                      placeholder="your.email@example.com"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                    {submitError && (
                      <span
                        className="text-destructive text-sm font-normal"
                        role="alert"
                      >
                        {submitError}
                      </span>
                    )}
                    {submitSuccess && (
                      <span
                        className="text-green-600 dark:text-green-400 text-sm font-normal"
                        role="alert"
                      >
                        ✓ Successfully signed up! You'll receive updates soon.
                      </span>
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="mr-2"
                  type="button"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                form="email-form"
                disabled={isSubmitting || submitSuccess}
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : submitSuccess ? (
                  "Success!"
                ) : (
                  <strong>Submit</strong>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SignUp;
