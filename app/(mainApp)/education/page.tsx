import ImageWrapper from "@/components/ImageWrapper";
import EducationSection from "./EducationSection";
import CertificateSection from "./CertificateSection";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Education - ResMe",
  description: "Your Educations",
  verification: {
    google: "google-site-verification=G-501H6DW77H",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
  },
};

const Education = () => {
  return (
    <ImageWrapper imgSrc="education">
      <div className="flex-1 flex flex-col items-center py-12 space-y-8 px-8">
        <EducationSection></EducationSection>

        <CertificateSection></CertificateSection>
      </div>
    </ImageWrapper>
  );
};

export default Education;

{
  /* <section className="w-full justify-start">
<Card className="w-[full] border-none">
  <CardHeader>
    <CardTitle>Add Education</CardTitle>
    <CardDescription>
      Add schools, universities, bootcamps you have attended
    </CardDescription>
  </CardHeader>
  <CardContent>
    
  
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>Northeastern Univeristy</span>
          <Button variant="ghost">
            <Settings2></Settings2>
          </Button>
        </CardTitle>
        <CardDescription className="flex justify-between">
          <span>
            Honors student with Bachelor's in Computer Science and
            Economics
          </span>
          <span>2021-2025</span>
        </CardDescription>
      </CardHeader>
    </Card>
    

  </CardContent>
  <CardFooter className="flex justify-end">
    <Button>
      Add <PlusCircleIcon className="ml-1.5 h-5 w-5"></PlusCircleIcon>
    </Button>
  </CardFooter>
</Card>
</section> */
}
