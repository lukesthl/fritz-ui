import type { NextPage } from "next";
import { Button } from "../../components/button";
import { useFormik } from "formik";
import { Input } from "../../components/input";
import { Logo } from "../../components/logo";
import { z } from "zod";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const validationSchema = z.object({
  username: z.string().min(1, { message: "Nutzername darf nicht leer sein." }),
  password: z.string().min(1, { message: "Passwort darf nicht leer sein." }),
});

const Login: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") {
      void router.replace("/");
    }
  }, [status, router]);

  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: (values) => {
      const validationResult = validationSchema.safeParse(values);
      if (!validationResult.success) {
        return validationResult.error.flatten().fieldErrors;
      }
    },
    validateOnChange: false,
    onSubmit: async (values, { setErrors }) => {
      setLoading(true);
      const response = await signIn("credentials", {
        ...values,
        redirect: false,
      });
      if (!response) {
        setErrors({ password: "Es ist ein Fehler aufgetreten." });
      } else if (!response?.ok) {
        setErrors({
          password: "Nutzer existiert nicht oder Passwort ist falsch.",
        });
      }
      setLoading(false);
    },
  });

  if (status !== "unauthenticated") {
    return <></>;
  }
  return (
    <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden">
      <div className="wrapper">
        <motion.div
          className="gradient"
          animate={{ scale: [1, 3] }}
          transition={{
            repeat: Infinity,
            originX: 1,
            originY: 0,
            duration: 10,
            repeatType: "mirror",
          }}
        />
      </div>
      <div className="top-[calc(50% - 1035px)] right-[calc(50% - 332px)] absolute h-[470px] w-[665px] scale-150 transform bg-[url('/grid.svg')] bg-cover" />
      <form
        onSubmit={formik.handleSubmit}
        className="box-blur z-10 rounded-xl border-2 border-white/20 bg-[#191A23]/30 py-8 px-8 shadow-white/10 backdrop-blur-xs md:px-20 md:py-16"
      >
        <div className="flex items-center justify-around">
          <div className="flex-1">
            <Logo />
          </div>
          <div className="flex flex-auto items-center justify-center">
            <div className="h-4 w-px bg-white/20" />
          </div>
          <span className="flex-1 font-medium text-white/80">Login</span>
        </div>
        <div className="mx-auto mt-8 w-72">
          <p className="text-center text-white/60">
            Melden Sie sich mit ihren FritzBox Nutzerdaten an.
          </p>
        </div>
        <div className="mt-8 flex flex-col space-y-4">
          <Input
            id="username"
            placeholder="Nutzername"
            className={formik.errors.username && "border-red-400"}
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          <Input
            id="password"
            placeholder="Passwort"
            type="password"
            className={formik.errors.password && "border-red-400"}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </div>
        {formik.errors && (
          <p className="mt-4 text-sm text-red-400">
            {formik.errors.username || formik.errors.password}
          </p>
        )}
        <div className="mt-4">
          <Button
            loading={loading}
            className="w-full"
            placeholder="Passwort"
            buttonType="submit"
          >
            Login
          </Button>
        </div>
      </form>
      {/* <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="h-full w-full scale-x-125 scale-y-75 bg-gradient-radial from-primary-500/20 via-transparent to-transparent md:h-[1024px] md:w-[1200px]"></div>
      </div> */}
    </div>
  );
};

export default Login;
