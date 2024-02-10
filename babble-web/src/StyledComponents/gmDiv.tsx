import styled from "styled-components";

export const GlassmorphismDiv = styled.div`
  background: rgba(255, 255, 255, 0.1); /* 투명한 배경 */
  border-radius: 30%; /* 모서리 둥글게 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  backdrop-filter: blur(10px); /* 뒷배경 블러 처리 */
  -webkit-backdrop-filter: blur(10px); /* 사파리 브라우저 대응 */
  border: 1px solid rgba(255, 255, 255, 0.18); /* 테두리 선명도 조절 */

  padding: 40px;
`;
