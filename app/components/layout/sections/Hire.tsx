import { Button } from '@/components/ui/Button';
import type { IForm } from '@/types/types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

export const Hire = () => {
  const { register, handleSubmit, watch, reset, formState } = useForm<IForm>({
    mode: 'onChange'
  });
  const [isSending, setIsSending] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [isSended, setIsSended] = useState(false);

  const { errors, isValid } = formState;

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    setIsSending(true);
    setIsError(null);
    const text = `
<b>📬 Нове повідомлення з сайту</b>
👤 <b>Ім’я:</b> ${data.name}
📧 <b>Email:</b> ${data.email}
📝 <b>Повідомлення:</b> ${data.message}
    `;

    try {
      const res = await fetch(
        `https://api.telegram.org/bot${import.meta.env.VITE_TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            chat_id: import.meta.env.VITE_TELEGRAM_CHAT_ID,
            text,
            parse_mode: 'HTML'
          })
        }
      );
      setIsSended(true);

      setTimeout(() => {
        setIsSended(false);
      }, 3000);

      reset();
    } catch (error) {
      console.error(error);
      setIsError('Something went wrong');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      className="flex flex-col w-full px-5 mx-auto lg:px-10 py-15 md:py-32 max-w-desktop"
      id="contacts"
      aria-label="Contact me for work opportunities"
    >
      <h1 className="mb-4 text-3xl font-bold tracking-wide text-center title-underline md:text-5xl">
        HIRE ME
      </h1>
      <div>
        <p className="max-w-lg mx-auto mb-10 text-sm font-light tracking-wide text-center text-foreground/55 max-md:px-5 md:mb-14">
          I'm open to full-time, part-time, and freelance opportunities. Feel
          free to reach out—I'd love to connect and discuss how we can work
          together. You can contact me through this form or via email:
          <br />
          <a
            href="mailto:v.hulaievych@gmail.com"
            className="leading-normal text-foreground hover:text-accent"
          >
            v.hulaievych@gmail.com
          </a>
        </p>
      </div>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col max-w-lg gap-4 mx-auto"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-foreground">
              Name
            </label>
            <input
              className={`px-4 py-2 text-foreground border rounded-md bg-background focus:border-accent outline-0 ${errors.name ? 'border-red' : 'border-border'}`}
              placeholder="Name"
              type="text"
              id="name"
              {...register('name', {
                required: 'This field is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters'
                },
                maxLength: {
                  value: 55,
                  message: 'Name must be max 55 characters'
                }
              })}
            />
            {errors.name && (
              <p className="text-xs text-red">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-foreground">
              Email
            </label>
            <input
              className={`px-4 py-2 text-foreground border rounded-md bg-background  focus:border-accent outline-0 ${errors.email ? 'border-red' : 'border-border'}`}
              id="email"
              type="email"
              placeholder="Email"
              {...register('email', {
                required: 'This field is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Please enter a valid email address'
                }
              })}
            />
            {errors.email && (
              <p className="text-xs text-red">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-foreground">
              Message
            </label>
            <textarea
              className={`px-4 py-2 text-foreground border rounded-md resize-none h-30 bg-background focus:border-accent outline-0 ${errors.message ? 'border-red' : 'border-border'}`}
              placeholder="Type your messahe here."
              id="message"
              {...register('message', {
                required: 'This field is required',
                minLength: {
                  value: 10,
                  message: 'Message must be at least 10 characters'
                }
              })}
            ></textarea>
            {errors.message && (
              <p className="text-xs text-red">{errors.message.message}</p>
            )}
          </div>
          <Button variant="wide" disabled={!isValid}>
            {isSending ? 'Sending...' : 'Send message'}
          </Button>
          {isError && <p className="text-xs text-red">{`${isError}`}</p>}
          {isSended && (
            <p className="text-xs text-green-500">{`Your message has been sent successfully.`}</p>
          )}
        </form>
      </div>
    </section>
  );
};
