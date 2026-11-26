import { set, type StringInputProps } from "sanity";
import { HEX_COLOR } from "../schemaTypes/presets";

/** Colour swatch that opens the browser's picker, next to the normal hex text box. */
export function ColorInput(props: StringInputProps) {
  const { value, onChange, readOnly } = props;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <input
        type="color"
        aria-label="Pick a colour"
        disabled={readOnly}
        value={value && HEX_COLOR.test(value) ? value : "#ffffff"}
        onChange={(e) => onChange(set(e.target.value))}
        style={{ width: 48, height: 36, padding: 0, flexShrink: 0, cursor: "pointer" }}
      />
      <div style={{ flex: 1 }}>{props.renderDefault(props)}</div>
    </div>
  );
}
