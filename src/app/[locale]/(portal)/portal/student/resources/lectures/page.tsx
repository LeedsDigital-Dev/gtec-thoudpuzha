import { VideoLectureList } from "../video-lecture-list";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function VideoLecturesPage({ params }: Props) {
  const { locale } = await params;
  return <VideoLectureList locale={locale} />;
}
