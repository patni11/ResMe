"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button, buttonVariants } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
//import { createSphereSession } from "@/lib/actions/sphere_session.action";
import { createStripeSession } from "@/lib/actions/stripe_session.action";

//import { Bitcoin, CreditCard } from "lucide-react";

import * as gtag from "@/lib/gtag";
//import { ComingSoon } from "@/components/Cards/ComingSoon";

import { useState } from "react";

// const PHToast = (
//   <a href="https://www.producthunt.com/products/resme" target="_blank">
//     <img
//       src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=427885&theme=light"
//       alt="ResMe - Create&#0032;Professional&#0032;resumes&#0032;in&#0032;seconds | Product Hunt"
//       // style={{"width: 250px; height: 54px;"}}
//       width="250"
//       height="54"
//     />
//   </a>
// );

export const GoPremiumButton = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const clickTracking = async () => {
    gtag.event({
      clientWindow: window,
      action: "go premium button",
      category: "purchase",
      label: "premium",
    });

    // console.log("process premium button");
    // toast({
    //   title:
    //     "We are launching Premium on 16th December Please support us on Product Hunt 😊",
    //   description: PHToast,
    // });
    try {
      const { url } = await createStripeSession("Expert");
      window.location.href = url || "/profile";
    } catch (e) {
      toast({
        title: "You must be signed up or there was a network issue",
      });
    }
    setIsLoading(false);
  };

  return (
    //<ComingSoon>
    <button
      className={buttonVariants({
        variant: "ghost",
        className:
          "w-full bg-gradient-to-r font-semibold from-pink-500 to-purple-500 hover:bg-purple-500 text-primary-foreground hover:text-primary-foreground",
      })}
      onClick={(e) => {
        e.preventDefault();
        setIsLoading(true);
        clickTracking();
      }}
    >
      {isLoading ? <LoadingSpinner /> : <span>Go Expert</span>}
    </button>
    // </ComingSoon>
  );
};

// WITH CRYPTO
// export const GoStudentButton = () => {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <div
//           className={buttonVariants({
//             variant: "ghost",
//             className:
//               "w-full text-blue-600 font-semibold rounded-full border border-blue-600 hover:bg-blue-600 hover:text-primary-foreground ",
//           })}
//         >
//           Go Student
//         </div>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Payment Options</DialogTitle>
//           <DialogDescription>
//             We provide various crypto and card payment options
//           </DialogDescription>
//         </DialogHeader>
//         <PaymentComponent />
//       </DialogContent>
//     </Dialog>
//   );
// };

export const GoStudentButton = () => {
  const { toast } = useToast();
  const [isCardLoading, setIsCardLoading] = useState(false);

  const ProcessCardPayment = async () => {
    gtag.event({
      clientWindow: window,
      action: "student card button",
      category: "purchase",
      label: "student",
    });
    // console.log("Process payment clicked");
    // toast({
    //   title:
    //     "We are launching Premium on 16th December Please support us on Product Hunt 😊",
    //   description: PHToast,
    // });

    try {
      const { url } = await createStripeSession("Student");

      window.location.href = url || "/profile";
    } catch (e) {
      console.log("Error", e);
      toast({
        title: "You must be signed up or there was a network issue",
      });
    }
    setIsCardLoading(false);
  };
  return (
    <Button
      variant="outline"
      className="w-full border border-blue-600 font-semibold text-blue-600 hover:bg-blue-600 hover:text-white"
      onClick={(e) => {
        e.preventDefault();
        setIsCardLoading(true);
        ProcessCardPayment();
      }}
      disabled={isCardLoading}
    >
      {isCardLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex">
          <span>Go Student</span>
        </div>
      )}
    </Button>
  );
};

// const PaymentComponent = () => {
//   const { toast } = useToast();
//   const [isCardLoading, setIsCardLoading] = useState(false);
//   const [isCryptoLoading, setIsCryptoLoading] = useState(false);
//   const ProcessCardPayment = async () => {
//     gtag.event({
//       clientWindow: window,
//       action: "student card button",
//       category: "purchase",
//       label: "student",
//     });
//     // console.log("Process payment clicked");
//     // toast({
//     //   title:
//     //     "We are launching Premium on 16th December Please support us on Product Hunt 😊",
//     //   description: PHToast,
//     // });

//     try {
//       const { url } = await createStripeSession("Student");

//       window.location.href = url || "/profile";
//     } catch (e) {
//       console.log("Error", e);
//       toast({
//         title: "You must be signed up or there was a network issue",
//       });
//     }
//     setIsCardLoading(false);
//   };

//   const ProcessCryptoPayment = async () => {
//     gtag.event({
//       clientWindow: window,
//       action: "student crypto button",
//       category: "purchase",
//       label: "student",
//     });

//     console.log("Process payment clicked");
//     toast({
//       title:
//         "We are launching Premium on 16th December Please support us on Product Hunt 😊",
//       description: PHToast,
//     });
//     // try {
//     //   const { url, success } = await createSphereSession();
//     //   //console.log("Received Output", url, success);
//     //   if (!success) {
//     //     toast({
//     //       title: "There was a issue try again later",
//     //     });
//     //     return;
//     //   }

//     //   window.location.href = url || "/profile";
//     // } catch (e) {
//     //   console.log("Error", e);
//     //   toast({
//     //     title: "You must be signed up or there was a network issue",
//     //   });
//     // }
//     setIsCryptoLoading(false);
//   };
//   return (
//     <div className="flex items-center justify-center space-x-4 p-6 rounded-lg">
//       <Button
//         variant="outline"
//         className="w-full border border-blue-600 font-semibold text-blue-600 hover:bg-blue-600 hover:text-white"
//         onClick={(e) => {
//           e.preventDefault();
//           setIsCardLoading(true);
//           ProcessCardPayment();
//         }}
//         disabled={isCardLoading || isCryptoLoading}
//       >
//         {isCardLoading ? (
//           <LoadingSpinner />
//         ) : (
//           <div className="flex">
//             <CreditCard className="h-5 w-5 mr-1" />
//             <span>Card</span>
//           </div>
//         )}
//       </Button>

//       <Button
//         variant="outline"
//         className="w-full border border-orange-400 font-semibold text-orange-400 hover:bg-orange-400 hover:text-white"
//         disabled={isCardLoading || isCryptoLoading}
//         onClick={(e) => {
//           e.preventDefault();
//           setIsCryptoLoading(true);
//           ProcessCryptoPayment();
//         }}
//       >
//         {isCryptoLoading ? (
//           <LoadingSpinner />
//         ) : (
//           <div className="flex">
//             <Bitcoin className="h-5 w-5" />
//             <span>Crypto</span>
//           </div>
//         )}
//       </Button>
//     </div>
//   );
// };
