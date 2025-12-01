import GuildBtnImg from "@/assets/images/guild-btn.png";
import GuildFormImg from "@/assets/images/guild-form.png";
import GuildModalImg from "@/assets/images/guilds-modal.png";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const NoticeContents = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
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
