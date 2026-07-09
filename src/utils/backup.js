export function exportBackup(mode, userStats) {
  const backup = {
    mode: mode,
    createdAt: new Date().toISOString(),
    data: userStats,
  };

  const json = JSON.stringify(backup, null, 2);

  const blob = new Blob([json], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `kana-trainer-${mode}-backup.json`;

  a.click();

  URL.revokeObjectURL(url);
}

export function importBackup() {
  return new Promise((resolve, reject) => {

    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";

    input.addEventListener("change", (event) => {
      const file = event.target.files[0];

      if (!file) {
        resolve(null);
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        try {
          const json = JSON.parse(reader.result);

          resolve({
            mode: json.mode,
            data: json.data,
          });

        } catch (err) {
          reject(err);
        }
      };

      reader.onerror = reject;

      reader.readAsText(file);
    });

    input.click();
  });
}