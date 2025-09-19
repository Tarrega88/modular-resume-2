type Props = { topic: string; text: string; link?: string; linkURL?: string };

function AboutTopic({ topic, text }: Props) {
  return (
    <div className="flex flex-col pb-4">
      <div className="font-semibold">{topic}</div>
      <div className="px-1 pt-2">{text}</div>
    </div>
  );
}

export default AboutTopic;
