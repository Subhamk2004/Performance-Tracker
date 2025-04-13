
import { useState } from "react"
import { Calendar, Hash, Trash, BookOpen } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { detectCodeBlocks } from "../utils/CodeFormatter.js"

const NoteCard = ({ note, onDelete, loading }) => {
    const [showActions, setShowActions] = useState(false)
    const navigate = useNavigate()
    const [clampStyle, setClampStyle] = useState("line-clamp-3")

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    const handleEdit = () => {
        // navigate(`/notes/edit/${note._id}`);
    }

    const formatTextContent = (text) => {
        // Preserve existing formatting
        return text
    }

    const renderContent = () => {
        const processedContent = detectCodeBlocks(note.content)

        return (
            <div className="text-gray-300 text-base">
                {processedContent.map((part, index) => {
                    if (part.type === "text") {
                        return (
                            <pre key={index} className="whitespace-pre-line mb-3">
                                {formatTextContent(part.content)}
                            </pre>
                        )
                    } else if (part.type === "code") {
                        return (
                            <div key={index} className="mb-3 rounded-lg overflow-hidden">
                                <SyntaxHighlighter
                                    language={part.language}
                                    style={atomDark}
                                    customStyle={{
                                        margin: 0,
                                        padding: "1rem",
                                        fontSize: "0.875rem",
                                        lineHeight: "1.5",
                                        borderRadius: "0.5rem",
                                        maxHeight: "300px",
                                        overflow: "auto",
                                    }}
                                    showLineNumbers={true}
                                    wrapLines={true}
                                    wrapLongLines={false}
                                >
                                    {part.content}
                                </SyntaxHighlighter>
                            </div>
                        )
                    }
                    return null
                })}
            </div>
        )
    }

    return (
        <div
            className="bg-secondary rounded-3xl p-6 transition-all hover:shadow-lg shadow-lg shadow-black"
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <BookOpen className="w-6 h-6 text-[#698eff]" />
                    <h3 className="text-xl font-bold text-[#698eff]">{note.title}</h3>
                </div>

                {showActions && (
                    <div className="flex items-center gap-3">
                        <button onClick={() => onDelete(note._id)} className="text-gray-400 hover:text-red-500 transition-colors">
                            <Trash size={18} />
                        </button>
                    </div>
                )}
            </div>

            <div className={`${clampStyle} flex flex-row min-w-[400px] w-auto max-w-[500px] flex-wrap overflow-scroll mb-3 `}>{renderContent()}</div>
            

            <div className="flex flex-wrap gap-2 mb-4">
                {note.hashtags &&
                    note.hashtags.map((tag, index) => (
                        <span key={index} className="flex items-center text-xs px-3 py-1 rounded-full bg-[#2a3447] text-[#698eff]">
                            <Hash size={12} className="mr-1" />
                            {tag.replace("#", "")}
                        </span>
                    ))}
            </div>

            <div className="flex flex-wrap items-center justify-between text-sm text-gray-400">
                <div className="flex items-center gap-4">
                    <span className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        Created: {formatDate(note.created_at)}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default NoteCard