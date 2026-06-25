// src/hooks/useChecklist.js
// Custom hook that loads checklist progress from the DB on mount,
// and saves it back whenever items change.
//
// USAGE inside your Checklist page/component:
//
//   import useChecklist from '../hooks/useChecklist';
//
//   const { checkedItems, toggleItem, loading } = useChecklist();
//
//   // checkedItems is a Set of checked itemIds
//   // toggleItem(id) flips an item's checked state and auto-saves to DB

import { useState, useEffect, useCallback } from 'react';

const API_BASE = '/api/checklist'; // adjust if your API path differs

const useChecklist = () => {
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  // ── Load progress from DB on mount ────────────────────────────────────
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await fetch(`${API_BASE}/progress`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('Failed to load progress');

        const data = await res.json();

        // Convert array of { itemId, checked } to a Set of checked itemIds
        const checked = new Set(
          data.items.filter((i) => i.checked).map((i) => i.itemId)
        );
        setCheckedItems(checked);
      } catch (err) {
        console.error('Could not load checklist progress:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [token]);

  // ── Save progress to DB ───────────────────────────────────────────────
  const saveProgress = useCallback(
    async (updatedSet) => {
      try {
        // Convert Set back to array format the backend expects
        const items = [...updatedSet].map((itemId) => ({
          itemId,
          checked: true,
        }));

        await fetch(`${API_BASE}/progress`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ items }),
        });
      } catch (err) {
        console.error('Could not save checklist progress:', err);
      }
    },
    [token]
  );

  // ── Toggle a single item and immediately save ─────────────────────────
  const toggleItem = useCallback(
    (itemId) => {
      setCheckedItems((prev) => {
        const next = new Set(prev);
        if (next.has(itemId)) {
          next.delete(itemId);
        } else {
          next.add(itemId);
        }
        saveProgress(next); // fire-and-forget save
        return next;
      });
    },
    [saveProgress]
  );

  return { checkedItems, toggleItem, loading, error };
};

export default useChecklist;
