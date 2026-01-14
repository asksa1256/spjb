import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { TriangleAlert } from "lucide-react";
import GuildBtnImg from "@/assets/images/guild-btn.png";
import GuildFormImg from "@/assets/images/guild-form.png";
import GuildModalImg from "@/assets/images/guilds-modal.png";
import SnowConfigImg from "@/assets/images/snow-config.png";
import SnowLightImg from "@/assets/images/snow-light.png";
import SnowDarkImg from "@/assets/images/snow-dark.png";
import BgmOnImg from "@/assets/images/bgm-on.png";
import CommentaryFieldImg from "@/assets/images/commentary-field.png";
import CommentaryImg from "@/assets/images/commentary.png";
import BGMConfigButtonImg from "@/assets/images/bgm-config-btn.png";

const NoticeContents = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="feat-snow-bgm">
        <AccordionTrigger className="text-base font-medium text-foreground">
          검색, BGM 기능 개선 (2025.1.14.)
        </AccordionTrigger>
        <AccordionContent className="mb-4 text-sm text-foreground bg-secondary p-4 rounded-md">
          <section className="mb-6 flex flex-col gap-2">
            <h4 className="font-bold">1) 검색 시 공백 구분 제거</h4>
            <p>이제 검색 시 띄어쓰기를 하지 않아도 동일한 결과가 제공됩니다.</p>
          </section>

          <section className="mb-6 flex flex-col gap-2">
            <h4 className="font-bold">2) 해설 추가</h4>
            <p>
              문제 등록 시 &apos;문제 해설&apos;을 선택적으로 입력하실 수
              있습니다.
            </p>
            <figure>
              <img src={CommentaryFieldImg} alt="문제 해설 입력 필드 이미지" />
            </figure>
            <p className="text-sm">
              해설이 포함된 문제는 검색 결과에서 아래와 같이 나타납니다.
            </p>
            <figure>
              <img src={CommentaryImg} alt="문제 해설 툴팁 이미지" />
            </figure>
          </section>

          <section className="mb-6 flex flex-col gap-2">
            <h4 className="font-bold">3) BGM 추가</h4>
            <p>이제 플레이리스트에 원하는 BGM을 추가하실 수 있습니다.</p>
            <figure>
              <img src={BGMConfigButtonImg} alt="bgm 편집 버튼 이미지" />
            </figure>
            <p className="text-sm text-foreground/50 flex items-center gap-1">
              <TriangleAlert className="size-3" /> BGM은 유튜브 동영상 링크만
              지원됩니다.
            </p>
          </section>

          <hr />

          <p className="mt-6 text-sm">감사합니다.</p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="feat-snow-bgm">
        <AccordionTrigger className="text-base font-medium text-foreground">
          "눈 내리기, 배경음악" 기능 업데이트 (2025.12.14.)
        </AccordionTrigger>
        <AccordionContent className="mb-4 text-sm text-foreground bg-secondary p-4 rounded-md">
          <p className="mb-4">
            전국에 첫눈이 내린 기념으로
            <br />
            <b>눈 내리기</b> 기능과 <b>배경음악</b> 기능을 추가했습니다.
          </p>

          <hr className="mb-4" />

          <section className="mb-6 flex flex-col gap-2">
            <h4 className="font-bold">1) 눈 내리기 모드 추가</h4>
            <p>
              화면 좌측 하단의 눈송이 모양 버튼을 클릭하면 눈 내리기 모드를
              on/off 할 수 있습니다.
            </p>
            <figure>
              <img src={SnowConfigImg} alt="눈 내리기 설정" />
            </figure>
            <p>
              눈 내리기 기능은 기본적으로 켜져있으며, 다크 모드에서 더욱
              선명하게 보입니다.
            </p>
            <figure>
              <img src={SnowLightImg} alt="눈 내리기 - 라이트 모드" />
            </figure>
            <figure>
              <img src={SnowDarkImg} alt="눈 내리기 - 다크 모드" />
            </figure>
          </section>

          <section className="mb-6 flex flex-col gap-2">
            <h4 className="font-bold">2) BGM 플레이어 추가</h4>
            <p>
              겨울 분위기 가득한 캐롤 플레이리스트 3개를 감상하실 수 있습니다.
            </p>
            <figure>
              <img src={BgmOnImg} alt="bgm 플레이어 on 화면" />
            </figure>
            <p className="text-sm">
              좌측 하단의 16분 음표 아이콘 버튼을 클릭하시면 배경음악을
              on/off하실 수 있습니다.
            </p>
            <p className="text-sm">
              &apos;재생&apos; 버튼을 눌러주셔야 재생됩니다. (autoplay 지원X)
            </p>
            <p className="text-sm">
              배경음악을 끄면 화면에서 컨트롤러가 사라지고, 배경음악도 멈춥니다.
            </p>
          </section>

          <hr />

          <p className="mt-6 text-sm">
            심플족보를 이용해주시는 분들께 항상 감사드립니다.
            <br />
            행복한 연말 되세요!
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="feat-guild-promotion">
        <AccordionTrigger className="text-base font-medium text-foreground">
          "길드 홍보" 기능 업데이트 (2025.12.01.)
        </AccordionTrigger>
        <AccordionContent className="text-sm text-foreground bg-secondary p-4 rounded-md">
          <p className="mb-4">
            <b>길드 홍보</b> 기능이 추가되었습니다.
            <br />
            길드를 둘러보고, 홍보해서 함께 즐겨보세요!
          </p>

          <hr className="mb-4" />

          <h4 className="font-bold">*사용 방법*</h4>
          <section className="mb-6 flex flex-col gap-2">
            <p>1) 길드 버튼 클릭</p>
            <figure>
              <img src={GuildBtnImg} alt="길드 버튼" />
            </figure>
          </section>

          <section className="mb-6 flex flex-col gap-2">
            <p>2) 길드 홍보 목록 조회</p>
            <figure>
              <img src={GuildModalImg} alt="길드 모달" />
            </figure>
            <p className="text-sm">
              목록 하단의 '길드 홍보하기'를 통해 길드를 홍보할 수 있습니다.
            </p>
          </section>

          <section className="mb-6 flex flex-col gap-2">
            <p>3) 길드 홍보 등록하기</p>
            <figure>
              <img src={GuildFormImg} alt="길드 홍보 폼" />
            </figure>
            <p className="text-sm">
              폼을 제출하면 길드 홍보글이 등록됩니다!
              <br />
            </p>
            <div>
              <span className="text-foreground/50">
                * 길드는 중복 홍보하실 수 없습니다.
              </span>
              <br />
              <span className="text-foreground/50">
                * 길드가 아닌 다른 정보를 기재하실 경우, 경고 없이 삭제될 수
                있습니다.
              </span>
            </div>
          </section>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default NoticeContents;
