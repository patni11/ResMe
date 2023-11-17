/* eslint-disable react/no-unescaped-entities */
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Tailwind,
  Link,
} from "@react-email/components";

interface PDFDownloadedEmailProps {
  name: string | null | undefined;
}

const PDFDownloadedEmail = ({ name }: PDFDownloadedEmailProps) => {
  const previewText = `${name} Congrats on creating your new Resume!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              <strong>Your Resume is Downloaded!</strong>
            </Heading>

            <Text className="text-black text-[14px] leading-[20px] flex flex-col">
              <span>Hi {name}</span>
            </Text>

            <Text className="text-sm">
              You just downloaded your Resume with
              <span className="font-semibold"> ResMe</span>. Thanks a lot!
            </Text>

            <Text className="text-black text-[14px] leading-[20px]">
              I hope you get your dream job soon! and Don't forget to save the
              Resume so you can edit and reuse it later!
            </Text>

            <Text className="text-black text-[14px] leading-[20px]">
              I provide free Resume Review to our Discord community members, and
              we have many companies posting job offers. Feel free to introduce
              yourself there.
              <Link href="https://discord.gg/Ghypc6rN"> Discord</Link>
            </Text>

            <Text className="text-black text-[14px] leading-[20px]">
              If you have any questions or need assistance, I'm just 1 DM away
              Here's my <Link href="https://twitter.com/resmexyz">Twitter</Link>{" "}
              :)
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
export default PDFDownloadedEmail;
