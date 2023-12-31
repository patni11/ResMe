import ContentSection from "@/components/Sections/ContentSection";
import { PlusCircleIcon, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectDialogContent from "./ProjectDialogContent";
import { getServerSession } from "next-auth/next";
import authOptions, { Session } from "@/lib/authOptions";
import { Project } from "@/lib/types";
import { fetchUserProjects } from "@/lib/actions/userProject.actions";
import ProjectCard from "./projectCard";

export const ProjectSection = async ({ path }: { path?: string }) => {
  const session: Session | null = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error("User not found");
  }

  const rawProjects = JSON.parse(
    JSON.stringify(await fetchUserProjects(session.user.email))
  );

  const projects: Project[] = rawProjects.map((proj: any) => ({
    ...proj,
    description: Array.isArray(proj.description)
      ? proj.description.join("\n")
      : proj.description,
  }));

  return (
    <ContentSection
      cardDetails={{
        title: "Add Projects",
        description:
          "Add personal projects, outside experiences, hackathons, etc.",
      }}
      dialogDetails={{
        dialogTitle: "Add Project",
        dialogTrigger: (
          <Button>
            Add <PlusCircleIcon className="ml-1.5 h-5 w-5" />
          </Button>
        ),
        dialogContent: (
          <ProjectDialogContent email={session.user.email} path={path} />
        ),
      }}
    >
      {!projects || projects.length <= 0 ? (
        <div className="flex text-sm text-accent-foreground justify-center w-full font-semibold italic">
          {" "}
          <p>You do not have any projects. Add some</p>{" "}
        </div>
      ) : (
        projects.map((projectVal: Project) => {
          projectVal = {
            projectName: projectVal.projectName,
            location: projectVal.location,
            positionTitle: projectVal.positionTitle,
            startDate: projectVal.startDate
              ? new Date(projectVal.startDate)
              : projectVal.startDate,
            endDate: projectVal.endDate
              ? new Date(projectVal.endDate)
              : projectVal.endDate,
            description: projectVal.description,
            _id: projectVal._id,
          };
          return (
            <ProjectCard
              key={projectVal._id}
              cardDetails={projectVal}
              dialogDetails={{
                dialogTitle: "Edit Project",
                dialogTrigger: (
                  <Button variant="ghost" aria-label="Update">
                    <Settings2 className="w-5 h-5"></Settings2>
                  </Button>
                ),
                dialogContent: (
                  <ProjectDialogContent
                    email={session.user.email}
                    defaultValues={projectVal}
                  />
                ),
              }}
            />
          );
        })
      )}
    </ContentSection>
  );
};
