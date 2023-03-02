export default function ReleaseNotes() {
  return (
    <>
      <label
        htmlFor="my-modal-4"
        className="self-end text-sm hover:cursor-pointer"
      >
        <span className="badge badge-primary badge-md">new</span> ver 1.1
      </label>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Release Notes</h3>
          <p className="py-4 text-gray-300">
            coming up !
            <br />• 매칭 취소 시 패널티 추가 예정
          </p>
          <p className="py-4">
            ver 1.1 | 2023.03.03
            <br />• 디자인 개선
            <br />• 릴리즈 노트 추가
          </p>
          <p className="py-4">
            ver 1.0.HOTFIX | 2023.03.01 19:45
            <br />• 매칭 취소 시 문자 알람 전송
            <br />• 탐색 범위가 모두 "상관 없음"으로 받아지는 버그 수정
            <br />• 로그인 인증 오류 수정
          </p>
          <p className="py-4">
            ver 1.0 | 2023.03.01
            <br />• 서비스 오픈 🎉
          </p>
        </label>
      </label>
    </>
  );
}
