import { GroupNode } from "@/components/d3/Bubbles";

type RootInput = {
    name: string;
    children: InputNode[];
};
type InputNode = {
    name: string;
    children: {
        name: string;
        level: number;
        description: string;
        imageUrl: string;
    }[];
};

export function mapToGroupNode(input: RootInput): GroupNode {
    const powerTransform = (value:number) => Math.pow(value/100, 3) * 100;
    return {
        value: 0,
        children: input.children.map((group, groupIndex) => ({
            value: 0,
            children: group.children.map(child => {
                return {
                    group: groupIndex,
                    groupName: group.name,
                    name:child.name,
                    description: child.description,
                    imageUrl: child.imageUrl,
                    value: powerTransform(child.level)
                };
            })
        }))
    };
}
