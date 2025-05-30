import { useState } from "react"
import { Calendar, Hash, Trash, BookOpen, Edit } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"

const NoteCard = ({ note, onDelete, onEdit, loading }) => {
    const [showActions, setShowActions] = useState(false)
    const navigate = useNavigate()
    const [isExpanded, setIsExpanded] = useState(false)
    const clampStyle = isExpanded ? "" : "line-clamp-3"

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    const handleEdit = (e) => {
        e.stopPropagation();
        onEdit(note);
    }

    const formatPlainText = (text) => {
        // First replace existing punctuation with a newline
        let formatted = text.replace(/([.!?])\s+/g, "$1\n");
        // Then add an extra blank line after every period at the end of a line
        formatted = formatted.replace(/\.\n/g, ".\n\n");
        return formatted;
    }

    const renderContent = () => {
        const codeBlockRegex = /&&&@@@(?:(\w+)?\n)?([\s\S]*?)@@@&&&/g
        let contentToRender = note.content
        const codeBlocks = []
        let match
        let lastIndex = 0
        
        while ((match = codeBlockRegex.exec(note.content)) !== null) {
            const language = match[1] || "plaintext"
            const code = match[2]
            const fullMatch = match[0]
            const startIndex = match.index
            
            if (startIndex > lastIndex) {
                codeBlocks.push({
                    type: "text",
                    content: formatPlainText(note.content.substring(lastIndex, startIndex))
                })
            }
            
            codeBlocks.push({
                type: "code",
                language,
                content: code
            })
            
            lastIndex = startIndex + fullMatch.length
        }
        
        if (lastIndex < note.content.length) {
            codeBlocks.push({
                type: "text",
                content: formatPlainText(note.content.substring(lastIndex))
            })
        }
        
        if (codeBlocks.length === 0) {
            return (
                <div className="whitespace-pre-wrap">{formatPlainText(note.content)}</div>
            )
        }
        
        return (
            <div>
                {codeBlocks.map((block, index) => (
                    <div key={index} className="mb-2">
                        {block.type === "text" ? (
                            <div className={`whitespace-pre-wrap ${clampStyle}`}>{block.content}</div>
                        ) : (
                            <div className={clampStyle}>
                                <SyntaxHighlighter
                                    language="javascript"
                                    style={atomDark}
                                    customStyle={{
                                        margin: 0,
                                        padding: "1rem",
                                        fontSize: "0.875rem",
                                        lineHeight: "1.5",
                                        borderRadius: "0.5rem",
                                        maxHeight: isExpanded ? "500px" : "200px",
                                        overflow: "auto",
                                    }}
                                    showLineNumbers={true}
                                    wrapLines={true}
                                    wrapLongLines={false}
                                >
                                    {block.content}
                                </SyntaxHighlighter>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div
            id={`note-${note._id}`}
            className="bg-secondary rounded-3xl p-6 transition-all hover:shadow-lg shadow-lg shadow-black cursor-pointer"
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
                        <button 
                            onClick={handleEdit} 
                            className="text-gray-400 hover:text-[#698eff] transition-colors"
                        >
                            <Edit size={18} />
                        </button>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(note._id);
                            }} 
                            className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <Trash size={18} />
                        </button>
                    </div>
                )}
            </div>

            <div className={`flex flex-col min-w-[400px] w-auto max-w-[500px] overflow-auto mb-3`}>
                {renderContent()}
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsExpanded(!isExpanded);
                    }} 
                    className="text-[#698eff] text-sm mt-2 hover:underline focus:outline-none self-start"
                >
                    {isExpanded ? "Read less" : "Read more"}
                </button>
            </div>

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