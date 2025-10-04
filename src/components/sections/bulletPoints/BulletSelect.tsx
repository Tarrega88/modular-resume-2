import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

export default function BulletSelect() {
  const bullets = useSelector(
    (state: RootState) => state.resume.data.bulletPoints
  );

  const renderBullets = Object.values(bullets);
  if (renderBullets.length === 0) return null;

  return (
    <select>
      {renderBullets.map((b) => (
        <option key={b.id} value={b.id}>
          {b.text}
        </option>
      ))}
    </select>
  );
}
