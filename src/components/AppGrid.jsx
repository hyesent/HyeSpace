import { useState, useMemo } from "react";
import { apps, categories } from "../data/apps";
import { useStore } from "../context/StoreContext";
import { useDebounce } from "../hooks/hooks";
import AppCard from "./AppCard";
import { StatsBar } from "./UI";

// ==================== APP GRID ====================

const AppGrid = () => {
  const { downloadCounts } = useStore();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const debouncedSearch = useDebounce(search, 200);

  // Filter and sort apps
  const filteredApps = useMemo(() => {
    let result = [...apps];

    // Category filter
    if (activeCategory !== "All") {
      result = result.filter((app) => app.category === activeCategory);
    }

    // Search filter
    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase();
      result = result.filter(
        (app) =>
          app.name.toLowerCase().includes(query) ||
          app.shortDescription.toLowerCase().includes(query) ||
          app.category.toLowerCase().includes(query) ||
          (app.tags && app.tags.some((tag) => tag.toLowerCase().includes(query)))
      );
    }

    // Sort
    switch (sortBy) {
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "downloads":
        result.sort(
          (a, b) =>
            (downloadCounts[b.id] || b.downloads || 0) -
            (downloadCounts[a.id] || a.downloads || 0)
        );
        break;
      case "updated":
        result.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
      default:
        result.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
        break;
    }

    return result;
  }, [activeCategory, debouncedSearch, sortBy, downloadCounts]);

  // Total downloads across all apps
  const totalDownloads = useMemo(() => {
    return apps.reduce((sum, app) => sum + (downloadCounts[app.id] || 0), 0);
  }, [downloadCounts]);

  return (
    <section className="apps-section">
      {/* Search and Filters */}
      <div className="filters-bar glass">
        <div className="search-wrapper">
          <svg
            className="search-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search apps..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="name">Name A-Z</option>
          <option value="downloads">Most Downloaded</option>
          <option value="rating">Highest Rated</option>
          <option value="updated">Recently Updated</option>
        </select>
      </div>

      {/* Category Pills */}
      <div className="category-pills">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`pill ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Stats */}
      <StatsBar totalApps={apps.length} totalDownloads={totalDownloads} />

      {/* Grid */}
      {filteredApps.length > 0 ? (
        <div className="apps-grid">
          {filteredApps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <h3>No apps found</h3>
          <p>Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      )}
    </section>
  );
};

export default AppGrid;