import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { TriangleAlert, Download } from "lucide-react";
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
import { AppWindow } from "lucide-react";

const NoticeContents = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="feat-rain-effect">
        <AccordionTrigger className="text-base font-medium text-foreground">
          "비 내리기" 기능 업데이트 (2026.06.19.)
        </AccordionTrigger>
        <AccordionContent className="mb-4 text-sm text-foreground bg-secondary p-4 rounded-md">
          <p className="mb-4">
            날씨 이펙트에 <b>비 내리기</b> 기능을 추가했습니다. 🌧️
          </p>

          <hr className="mb-4" />

          <section className="mb-6 flex flex-col gap-2">
            <h4 className="font-bold">1) 비 내리기 이펙트 추가</h4>
            <p>
              화면 좌측 하단의 날씨 이펙트 버튼을 클릭하면 나타나는 설정
              패널에서 <b>🌧️ 비</b>를 선택할 수 있습니다.
            </p>
            <p>
              기존 <b>❄️ 눈</b>, <b>🌸 벚꽃</b>과 함께 원하는 이펙트를
              골라보세요!
            </p>
          </section>

          <section className="mb-6 flex flex-col gap-2">
            <h4 className="font-bold">2) 비 내리는 속도 조절 추가</h4>
            <p>
              비 이펙트를 선택하면 <b>빗방울 개수</b>와 함께
              <b> 비 내리는 속도</b>를 슬라이더로 조절할 수 있습니다.
            </p>
          </section>

          <hr />

          <p className="mt-6 text-sm">
            심플족보를 이용해주시는 분들께 항상 감사드립니다.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="feat-csv-download">
        <AccordionTrigger className="text-base font-medium text-foreground">
          "족보 다운로드" 업데이트 (2026.04.06.)
        </AccordionTrigger>
        <AccordionContent className="mb-4 text-sm text-foreground bg-secondary p-4 rounded-md">
          <p className="mb-4">
            심플족보에 등록된 족보를 CSV 파일로 다운로드하실 수 있습니다.
            <br/>
            해당 파일로 <b>오프라인에서도 퀴즈별 문제와 답 검색</b>이 가능합니다.
            <br/>
            <span className="text-gray-500 text-xs leading-none">* 오프라인 데이터는 다운로드 시점 이후로 새 데이터가 반영되지 않습니다. 최신 퀴즈 데이터를 받으시려면 심플족보 접속 후 새 파일을 다운로드해주세요.</span>
          </p>

          <hr className="mb-4" />

          <section className="mb-6 flex flex-col gap-2">
            <h4 className="font-bold">족보 다운로드 방법</h4>
            <p>
              화면 좌측 하단의 다운로드 아이콘(<Download className="size-4 inline-block align-text-bottom" />)을 클릭하면
              4개 퀴즈 카테고리(OX, 꽁꽁, 꼬로록, 가로세로)의 전체 문제와 답을
              하나의 <b>ZIP 파일</b>로 다운로드할 수 있습니다.
            </p>
            <p>
              ZIP 파일 안에는 카테고리별 CSV 파일이 포함되어 있습니다.
            </p>
            <ul className="list-disc list-inside text-foreground/70 flex flex-col gap-1">
              <li>quiz_ox.csv</li>
              <li>quiz_kkong.csv</li>
              <li>quiz_kkororok.csv</li>
              <li>quiz_garo.csv</li>
            </ul>
          </section>

          <hr />

          <p className="mt-6 text-sm">감사합니다.</p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="feat-cherry-blossom">
        <AccordionTrigger className="text-base font-medium text-foreground">
          "벚꽃 이펙트" 업데이트 (2026.03.27.)
        </AccordionTrigger>
        <AccordionContent className="mb-4 text-sm text-foreground bg-secondary p-4 rounded-md">
          <p className="mb-4">
            봄을 맞이하여 <b>벚꽃 이펙트</b>를 추가했습니다. 🌸
          </p>

          <hr className="mb-4" />

          <section className="mb-6 flex flex-col gap-2">
            <h4 className="font-bold">1) 벚꽃 이펙트 추가</h4>
            <p>
              화면 좌측 하단의 눈송이 버튼을 클릭하면 나타나는 설정 패널에서
              <b> 이펙트 종류</b>를 선택할 수 있습니다.
            </p>
            <p>
              <b>❄️ 눈</b>과 <b>🌸 벚꽃</b> 중 원하는 이펙트를 골라보세요!
            </p>
          </section>

          <hr />

          <p className="mt-6 text-sm">
            심플족보를 이용해주시는 분들께 항상 감사드립니다.
            <br />
            행복한 봄 되세요!
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="feat-popup-mode">
        <AccordionTrigger className="text-base font-medium text-foreground">
          "팝업창 모드" 업데이트 (2026.02.22.)
        </AccordionTrigger>
        <AccordionContent className="mb-4 text-sm text-foreground bg-secondary p-4 rounded-md">
          <section className="mb-6 flex flex-col gap-2">
            <h4 className="font-bold">1) 팝업창 모드 추가</h4>
            <p>
              우측 상단의 윈도우 창 아이콘(<AppWindow className="size-5 inline-block" />)을 클릭하면 심플족보를 팝업창 모드(모바일 화면 비율)로 띄울 수 있습니다.
            </p>
          </section>

          <section className="mb-6 flex flex-col gap-2">
            <h4 className="font-bold">2) 중복 답 복사 기능 추가</h4>
            <p>
              검색 결과가 1개이거나, 결과가 여러 개이더라도 정답이 동일할 경우 답이 자동 복사됩니다. (꽁꽁 퀴즈만 해당)
            </p>
          </section>

          <hr />

          <p className="mt-6 text-sm">
            감사합니다.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="feat-snow-bgm">
        <AccordionTrigger className="text-base font-medium text-foreground">
          검색 기능 개선, &apos;문제 해설&apos; 추가 (2025.1.14.)
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
