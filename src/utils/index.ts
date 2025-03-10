import { IconStyle } from "@phosphor-icons/core";

import { SnippetType } from "@/lib";

export function getCodeSnippets({
  name,
  displayName,
  weight,
  size,
  color,
}: {
  name: string;
  displayName: string;
  weight: IconStyle;
  size: number;
  color: string;
}): Record<SnippetType, string> {
  const isDefaultWeight = weight === "regular";
  const isDefaultColor = color === "#000000";
  const elmName = displayName.replace(/^\w/, (c) => c.toLowerCase());
  const elmWeight = weight.replace(/^\w/, (c) => c.toUpperCase());

  return {
    [SnippetType.HTML]: `<i class="ph${
      isDefaultWeight ? "" : `-${weight}`
    } ph-${name}"></i>`,
    [SnippetType.REACT]: `<${displayName} size={${size}} ${
      !isDefaultColor ? `color="${color}" ` : ""
    }${isDefaultWeight ? "" : `weight="${weight}" `}/>`,
    [SnippetType.VUE]: `<ph${displayName
      .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2")
      .toLowerCase()} :size="${size}" ${
      !isDefaultColor ? `color="${color}" ` : ""
    }${isDefaultWeight ? "" : `weight="${weight}" `}/>`,
    [SnippetType.FLUTTER]: `Icon(\n  PhosphorIcons.${displayName.replace(
      /^\w/,
      (c) => c.toLowerCase()
    )}${
      isDefaultWeight ? "" : weight.replace(/^\w/, (c) => c.toUpperCase())
    },\n  size: ${size.toFixed(1)},\n${
      !isDefaultColor ? `  color: Color(0xff${color.replace("#", "")}),\n` : ""
    })`,
    [SnippetType.ELM]: `Phosphor.${elmName}${
      isDefaultWeight ? "" : " " + elmWeight
    }
    |> withSize ${size}
    |> withSizeUnit "px"
    |> toHtml []`,
  };
}

export function supportsWeight({
  type,
  weight,
}: {
  type: SnippetType;
  weight: IconStyle;
}): boolean {
  if (type !== SnippetType.FLUTTER) return true;
  return weight !== IconStyle.DUOTONE;
}
