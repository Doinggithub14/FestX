import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { remark } from "remark";
import html from "remark-html";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "What is Fest X?",
    answer:
      "Fest X is a college fest management website that simplifies event organization and enhances participant engagement.",
    value: "item-1",
  },
  {
    question: "What features does Fest X offer?",
    answer: `Fest X offers a variety of features, including:
- **Event Listing & Details**: A well-structured interface where users can explore fest events, view schedules, and get event-specific information.
- **Participant Registration System**: A seamless form-based registration process that allows individuals and teams to sign up for events efficiently.
- **Quizzes & Interactive Challenges**: A built-in quiz module where participants can engage in fest-related challenges, MCQs, or coding contests.
- **User Dashboard**: A personalized dashboard for participants to track their registrations, quiz scores, and event updates.
- **Real-Time Announcements & Notifications**: Instant alerts for event changes, results, and important announcements.`,
    value: "item-2",
  },
  {
    question: "How can I register for events on Fest X?",
    answer:
      "You can register for events on Fest X by using our participant registration system. Simply fill out the form for the event you are interested in, and you will receive a confirmation.",
    value: "item-3",
  },
  {
    question: "How can I track my event registrations and quiz scores?",
    answer:
      "You can track your event registrations and quiz scores through your personalized user dashboard on Fest X.",
    value: "item-4",
  },
  {
    question: "How will I receive updates and announcements?",
    answer:
      "You will receive real-time announcements and notifications for event changes, results, and important updates directly on Fest X.",
    value: "item-5",
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="container max-w-3xl mx-auto py-12">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          FAQS
        </h2>
        <h2 className="text-3xl md:text-4xl text-center font-bold">
          Common Questions
        </h2>
      </div>
      <Accordion type="single" collapsible className="AccordionRoot">
        {FAQList.map(async ({ question, answer, value }) => {
          const processedContent = await remark().use(html).process(answer);
          const contentHtml = processedContent.toString();
          return (
            <AccordionItem key={value} value={value}>
              <AccordionTrigger className="text-left">
                {question}
              </AccordionTrigger>

              <AccordionContent>
                <div
                  className="prose dark:prose-invert leading-snug"
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
};
