import { CommentEmailAsReactData } from "@liveblocks/emails";
import { Section, Row, Column, Img, Button } from "@react-email/components";

type CommentProps = CommentEmailAsReactData;

export function Comment({
  id,
  author,
  createdAt,
  reactBody,
  url,
}: CommentProps) {
  const creationDate = createdAt
    .toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .replace(",", "");
  return (
    <Section
      key={id}
      className="my-4 rounded-md py-4 pl-4 pr-8"
      // NOTE: `react-email` do not interpret correctly borders
      // in `className` attribute w/ `tailwindcss`.
      style={{ border: "solid 1px rgba(23, 23, 23, 0.10)" }}
    >
      <Row>
        <Column className="w-[34px]">
          <Img
            className="rounded-full bg-[hsla(0, 0%, 93%, 1)]"
            width={28}
            height={28}
            src={author.info.avatar}
          />
        </Column>
        <Column>
          {author.info.name}{" "}
          <span className="text-[rgba(23, 23, 23, 0.6)] text-xs">
            {creationDate}
          </span>
        </Column>
      </Row>
      <Row className="mt-1">
        <Column className="w-[34px]" />
        <Column>
          {reactBody}
          <Button
            className="bg-[#171717] rounded-md px-4 h-[36px] text-white text-sm font-medium flex justify-center w-max flex-col"
            href={url}
          >
            View comment
          </Button>
        </Column>
      </Row>
    </Section>
  );
}