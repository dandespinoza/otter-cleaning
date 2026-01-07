import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Highlighter,
  Minus,
  Pilcrow,
  X,
  Plus,
  Info,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  LayoutGrid,
  CheckSquare,
  Megaphone,
  ChevronDown,
} from "lucide-react";
import { useState, useCallback } from "react";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

// Content block templates
const contentBlocks = [
  {
    name: "Info Callout",
    icon: Info,
    color: "text-blue-500",
    html: `<div class="callout callout-info">
<span class="callout-icon">ℹ️</span>
<div class="callout-content">
<strong>Did You Know?</strong>
<p>Add your helpful information here to educate your readers...</p>
</div>
</div>`,
  },
  {
    name: "Warning Callout",
    icon: AlertTriangle,
    color: "text-amber-500",
    html: `<div class="callout callout-warning">
<span class="callout-icon">⚠️</span>
<div class="callout-content">
<strong>Important Notice</strong>
<p>Add your warning or important notice here...</p>
</div>
</div>`,
  },
  {
    name: "Success Callout",
    icon: CheckCircle,
    color: "text-emerald-500",
    html: `<div class="callout callout-success">
<span class="callout-icon">✅</span>
<div class="callout-content">
<strong>Great News!</strong>
<p>Share positive information or success tips here...</p>
</div>
</div>`,
  },
  {
    name: "Pro Tip",
    icon: Lightbulb,
    color: "text-yellow-500",
    html: `<div class="tip-box">
<span class="tip-icon">💡</span>
<div>
<strong>Pro Tip</strong>
<p>Share your expert advice here to help readers...</p>
</div>
</div>`,
  },
  {
    name: "Feature Grid (4)",
    icon: LayoutGrid,
    color: "text-purple-500",
    html: `<div class="feature-grid">
<div class="feature-item">
<span class="feature-icon">🎯</span>
<strong>Precision</strong>
<p>Attention to every detail</p>
</div>
<div class="feature-item">
<span class="feature-icon">⚡</span>
<strong>Fast</strong>
<p>Quick turnaround times</p>
</div>
<div class="feature-item">
<span class="feature-icon">🌿</span>
<strong>Eco-Friendly</strong>
<p>100% organic products</p>
</div>
<div class="feature-item">
<span class="feature-icon">💯</span>
<strong>Guaranteed</strong>
<p>Satisfaction promise</p>
</div>
</div>`,
  },
  {
    name: "Checklist",
    icon: CheckSquare,
    color: "text-green-500",
    html: `<div class="checklist">
<h4>✨ Quick Checklist</h4>
<ul>
<li>First task or item to complete</li>
<li>Second task or item to complete</li>
<li>Third task or item to complete</li>
<li>Fourth task or item to complete</li>
</ul>
</div>`,
  },
  {
    name: "CTA Box",
    icon: Megaphone,
    color: "text-red-500",
    html: `<div class="cta-box">
<span class="cta-icon">🚀</span>
<h4>Ready to Get Started?</h4>
<p>Book your professional cleaning today and experience the difference!</p>
</div>`,
  },
  {
    name: "Stats Grid",
    icon: LayoutGrid,
    color: "text-indigo-500",
    html: `<div class="stats-grid">
<div class="stat-item">
<span class="stat-number">500+</span>
<span class="stat-label">Happy Clients</span>
</div>
<div class="stat-item">
<span class="stat-number">15+</span>
<span class="stat-label">Years Experience</span>
</div>
<div class="stat-item">
<span class="stat-number">100%</span>
<span class="stat-label">Satisfaction</span>
</div>
</div>`,
  },
  {
    name: "Quote Box",
    icon: Quote,
    color: "text-slate-500",
    html: `<div class="quote-box">
<span class="quote-icon">"</span>
<p class="quote-text">Add an inspiring quote or customer testimonial here to build trust with your readers.</p>
<p class="quote-author">— Author Name</p>
</div>`,
  },
];

export function RichTextEditor({ content, onChange, placeholder = "Start writing..." }: RichTextEditorProps) {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [showBlocksMenu, setShowBlocksMenu] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue underline",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto my-4",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      Highlight.configure({
        HTMLAttributes: {
          class: "bg-yellow-200 px-1 rounded",
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "blog-content min-h-[400px] focus:outline-none p-6",
      },
    },
  });

  const addLink = useCallback(() => {
    if (linkUrl && editor) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: linkUrl }).run();
      setLinkUrl("");
      setShowLinkInput(false);
    }
  }, [editor, linkUrl]);

  const removeLink = useCallback(() => {
    if (editor) {
      editor.chain().focus().unsetLink().run();
    }
  }, [editor]);

  const addImage = useCallback(() => {
    if (imageUrl && editor) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
      setShowImageInput(false);
    }
  }, [editor, imageUrl]);

  const insertBlock = useCallback((html: string) => {
    if (editor) {
      editor.chain().focus().insertContent(html).run();
      setShowBlocksMenu(false);
    }
  }, [editor]);

  if (!editor) return null;

  const ToolbarButton = ({
    onClick,
    isActive = false,
    disabled = false,
    children,
    title,
  }: {
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    title: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        "p-2 rounded hover:bg-slate-100 transition-colors disabled:opacity-50",
        isActive && "bg-slate-200 text-blue"
      )}
    >
      {children}
    </button>
  );

  const Divider = () => <div className="w-px h-6 bg-slate-200 mx-1" />;

  return (
    <div className="border rounded-xl overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="border-b bg-slate-50 p-2 flex flex-wrap items-center gap-1">
        {/* History */}
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo">
          <Undo className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo">
          <Redo className="h-4 w-4" />
        </ToolbarButton>

        <Divider />

        {/* Text Style */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
          title="Underline"
        >
          <UnderlineIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
          title="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          isActive={editor.isActive("highlight")}
          title="Highlight"
        >
          <Highlighter className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive("code")}
          title="Inline Code"
        >
          <Code className="h-4 w-4" />
        </ToolbarButton>

        <Divider />

        {/* Headings */}
        <ToolbarButton
          onClick={() => editor.chain().focus().setParagraph().run()}
          isActive={editor.isActive("paragraph")}
          title="Paragraph"
        >
          <Pilcrow className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive("heading", { level: 2 })}
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive("heading", { level: 3 })}
          title="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>

        <Divider />

        {/* Lists */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal Rule"
        >
          <Minus className="h-4 w-4" />
        </ToolbarButton>

        <Divider />

        {/* Alignment */}
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          isActive={editor.isActive({ textAlign: "left" })}
          title="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          isActive={editor.isActive({ textAlign: "center" })}
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          isActive={editor.isActive({ textAlign: "right" })}
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </ToolbarButton>

        <Divider />

        {/* Link */}
        <div className="relative">
          <ToolbarButton
            onClick={() => {
              if (editor.isActive("link")) {
                removeLink();
              } else {
                setShowLinkInput(!showLinkInput);
              }
            }}
            isActive={editor.isActive("link")}
            title="Add Link"
          >
            <LinkIcon className="h-4 w-4" />
          </ToolbarButton>
          {showLinkInput && (
            <div className="absolute top-full left-0 mt-2 p-3 bg-white border rounded-lg shadow-lg z-50 flex gap-2">
              <Input
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://..."
                className="w-64"
                onKeyDown={(e) => e.key === "Enter" && addLink()}
              />
              <Button size="sm" onClick={addLink}>Add</Button>
              <Button size="sm" variant="ghost" onClick={() => setShowLinkInput(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Image */}
        <div className="relative">
          <ToolbarButton onClick={() => setShowImageInput(!showImageInput)} title="Add Image">
            <ImageIcon className="h-4 w-4" />
          </ToolbarButton>
          {showImageInput && (
            <div className="absolute top-full left-0 mt-2 p-3 bg-white border rounded-lg shadow-lg z-50 flex gap-2">
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Image URL..."
                className="w-64"
                onKeyDown={(e) => e.key === "Enter" && addImage()}
              />
              <Button size="sm" onClick={addImage}>Add</Button>
              <Button size="sm" variant="ghost" onClick={() => setShowImageInput(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <Divider />

        {/* Content Blocks */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowBlocksMenu(!showBlocksMenu)}
            className="flex items-center gap-1 px-3 py-1.5 rounded bg-blue text-white text-sm font-medium hover:bg-blue/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Blocks
            <ChevronDown className="h-3 w-3" />
          </button>
          {showBlocksMenu && (
            <div className="absolute top-full left-0 mt-2 p-2 bg-white border rounded-xl shadow-xl z-50 w-64">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide px-2 py-1 mb-1">
                Insert Content Block
              </p>
              {contentBlocks.map((block) => (
                <button
                  key={block.name}
                  type="button"
                  onClick={() => insertBlock(block.html)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors text-left"
                >
                  <block.icon className={cn("h-5 w-5", block.color)} />
                  <span className="text-sm font-medium text-slate-700">{block.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />

      {/* Footer */}
      <div className="border-t bg-slate-50 px-4 py-2 text-sm text-muted-foreground flex justify-between">
        <span>{editor.storage.characterCount?.characters?.() || content.replace(/<[^>]*>/g, "").length} characters</span>
        <span>{content.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length} words</span>
      </div>
    </div>
  );
}
