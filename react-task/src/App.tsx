import { HEADERS, ROUTES, type Route } from "./data";
import styles from "./App.module.css";
import { useEffect, useState } from "react";
import { Arrow } from "./ArrowIcon";

export const App = () => {
  const [routes, setRoutes] = useState<Route[]>(ROUTES);
  const [lastFilter, setLastFilter] = useState<{
    name: string;
    direction: "asc" | "desc";
    sortFn: (a: string, b: string) => number;
  }>({
    name: "",
    direction: "asc",
    sortFn: () => 0,
  });

  useEffect(() => {
    const sortedRoutes = [...routes].sort((a, b) => {
      return lastFilter.direction === "asc"
        ? lastFilter.sortFn(
            a[lastFilter.name as keyof Route],
            b[lastFilter.name as keyof Route]
          )
        : lastFilter.direction === "desc"
        ? lastFilter.sortFn(
            b[lastFilter.name as keyof Route],
            a[lastFilter.name as keyof Route]
          )
        : 0;
    });
    setRoutes(sortedRoutes);
  }, [lastFilter]);

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr className={styles.tableRow}>
            {HEADERS.map((header) => (
              <th
                key={header.name}
                onClick={() => {
                  const newFilter = {
                    name: header.name,
                    direction: lastFilter.direction,
                    sortFn: header.sortFn,
                  };
                  if (lastFilter.name === header.name) {
                    newFilter.direction =
                      lastFilter.direction === "asc" ? "desc" : "asc";
                  }
                  setLastFilter(newFilter);
                }}
              >
                <div className={styles.thContent}>
                  {header.title}
                  <Arrow
                    direction={
                      lastFilter.name === header.name
                        ? lastFilter.direction
                        : null
                    }
                  />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {routes.map((route) => (
            <tr key={route.uuid}>
              {HEADERS.map((header) => {
                const cellValue = `${route[header.name as keyof Route]}${
                  header.name === "address" ? `/${route.mask}` : ""
                }`;
                return <td key={header.name}>{cellValue}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
