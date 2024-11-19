import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const CREATE_JOURNAL_ENTRY = gql`
  mutation CreateJournalEntry(
    $content: String!
    $mood: String
    $tags: [String!]
  ) {
    createJournalEntry(content: $content, mood: $mood, tags: $tags) {
      id
      content
      mood
      tags
      createdAt
    }
  }
`;

const JournalEntry: React.FC = () => {
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [tags, setTags] = useState("");

  const [createJournalEntry] = useMutation(CREATE_JOURNAL_ENTRY);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createJournalEntry({
      variables: {
        content,
        mood,
        tags: tags.split(",").map((tag) => tag.trim()),
      },
    });
    setContent("");
    setMood("");
    setTags("");
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Journal Entry</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your journal entry..."
          className="w-full p-2 border rounded mb-4"
          rows={4}
        ></textarea>
        <input
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="Mood"
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma-separated)"
          className="w-full p-2 border rounded mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Entry
        </button>
      </form>
    </div>
  );
};

export default JournalEntry;
