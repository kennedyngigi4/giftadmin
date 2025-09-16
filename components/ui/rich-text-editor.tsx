"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import Image from "@tiptap/extension-image"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import {
    Bold,
    Italic,
    Heading1,
    Heading2,
    List,
    LinkIcon,
    Image as ImageIcon,
} from "lucide-react"

type RichTextEditorProps = {
    value?: string
    onChange?: (value: string) => void
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link,
            Image,
            Placeholder.configure({
                placeholder: "Start typing your blog content...",
            }),
        ],
        content: value || "",
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML()) // update form value
        },
    })

    // Sync form value -> editor
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value || "", false)
        }
    }, [value, editor])

    if (!editor) return null

    return (
        <div className="w-full space-y-4">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-2 border-b pb-2">
                <Toggle
                    pressed={editor.isActive("bold")}
                    onPressedChange={() => editor.chain().focus().toggleBold().run()}
                >
                    <Bold className="h-4 w-4" />
                </Toggle>

                <Toggle
                    pressed={editor.isActive("italic")}
                    onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                >
                    <Italic className="h-4 w-4" />
                </Toggle>

                <Toggle
                    pressed={editor.isActive("heading", { level: 1 })}
                    onPressedChange={() =>
                        editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }
                >
                    <Heading1 className="h-4 w-4" />
                </Toggle>

                <Toggle
                    pressed={editor.isActive("heading", { level: 2 })}
                    onPressedChange={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                >
                    <Heading2 className="h-4 w-4" />
                </Toggle>

                <Toggle
                    pressed={editor.isActive("bulletList")}
                    onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
                >
                    <List className="h-4 w-4" />
                </Toggle>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        const url = prompt("Enter URL")
                        if (url) {
                            editor.chain().focus().setLink({ href: url }).run()
                        }
                    }}
                >
                    <LinkIcon className="h-4 w-4 mr-1" /> Link
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        const url = prompt("Enter image URL")
                        if (url) {
                            editor.chain().focus().setImage({ src: url }).run()
                        }
                    }}
                >
                    <ImageIcon className="h-4 w-4 mr-1" /> Image
                </Button>
            </div>

            {/* Editor Content */}
            <EditorContent
                editor={editor}
                className="w-full p-3 border rounded-md min-h-[200px] focus:outline-none"
            />
        </div>
    )
}
