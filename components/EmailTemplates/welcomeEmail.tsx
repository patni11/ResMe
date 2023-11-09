import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Tailwind,
} from "@react-email/components";

interface WelcomeEmailProps {
  name: string | null | undefined;
}

export const WelcomeEmail = ({ name }: WelcomeEmailProps) => {
  const previewText = `Welcome to Papermark, ${name}!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="my-10 mx-auto p-5 w-[465px]">
            <Heading className="text-2xl font-normal text-center p-0 my-8 mx-0">
              Welcome to ResMe!
            </Heading>
            <Text className="text-sm">Hello {name},</Text>
            <Text className="text-sm">
              This is Shubh Patni, I am excited to have you onboard at{" "}
              <span>ResMe</span>. If you have any questions or need assistance,
              feel free to reach out.
            </Text>

            <Text className="text-sm">
              Cheers,
              <br />
              Shubh Patni @ResMe
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
