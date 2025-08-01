"use client";

import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input"; // komponen input kamu
import { Button } from "@/components/ui/button";

type User = {
  id: string;
  name: string;
};

const usersData: User[] = [
  { id: "1", name: "Andi" },
  { id: "2", name: "Budi" },
  { id: "3", name: "Citra" },
];

export default function UserSearch() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const filteredUsers = useMemo(() => {
    if (!query) return usersData;
    return usersData.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Cari nama..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          onClick={() => setQuery(search.trim())}
          disabled={!search.trim()}
        >
          Search
        </Button>
      </div>

      {filteredUsers.length === 0 ? (
        <p>Tidak ada hasil.</p>
      ) : (
        <ul className="list-disc list-inside">
          {filteredUsers.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
