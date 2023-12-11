/* eslint-disable react/no-unescaped-entities */
import {
  Body,
  Container,
  Head,
  Heading,
  Link,
  Html,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";

// import { Preview } from "@react-email/preview";
// import { Head } from "@react-email/head";
// import { Text } from "@react-email/text";
// import { Tailwind } from "@react-email/tailwind";
// import { Container } from "@react-email/container";
// import { Heading } from "@react-email/heading";
// import { Link } from "@react-email/link";
// import { Html } from "@react-email/html";
import * as React from "react";

interface ContactMeEmailProps {
  name: string | null | undefined;
}

const WelcomeEmail = ({ name }: ContactMeEmailProps) => {
  const previewText = `${name} Welcome to ResMe`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              <strong>Welcome to ResMe</strong>
            </Heading>

            <p className="text-black text-[14px]">
              Hi {name},
              <br />I am Shubh Patni
            </p>

            <Text className="text-black text-[14px] leading-[20px]">
              I am excited to have you onboard! If you have any questions or
              need assistance, feel free to reach out.
            </Text>

            <Text className="text-black text-[14px] leading-[20px]">
              You can email me here or DM on
              <Link href="https://twitter.com/resmexyz"> Twitter</Link> :)
            </Text>

            <Text className="text-black text-[14px] leading-[20px]">
              I provide free Resume Review to our Discord community members, and
              we have many companies posting job offers. Feel free to introduce
              yourself there.
              <Link href="https://discord.gg/jNp89cbpSa"> Discord</Link>
            </Text>

            <p className="text-black text-[14px]">
              Cheers,
              <br />
              Shubh Patni
              <br />
              Founder @ResMe
            </p>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeEmail;
