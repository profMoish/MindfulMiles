from datetime import datetime, timedelta

week_times = {
    "Вс": "10:00",
    "Пн": "08:00",
    "Вт": "05:30",
    "Ср": "06:30",
    "Чт": "08:00",
    "Пт": "05:50",
    "Сб": "09:30"
}

# Устанавливаем порядок дней недели
ordered_days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]

# Преобразуем времена в datetime объекты (используем одну и ту же дату)
time_objects = {
    day: datetime.strptime(t, "%H:%M") for day, t in week_times.items()
}

# Сортируем по дню недели
sorted_times = [time_objects[day] for day in ordered_days]

# Считаем миллисекунды между соседними днями
diffs_ms = []
for i in range(len(sorted_times) - 1):
    delta = sorted_times[i + 1] - sorted_times[i]
    if delta.days < 0:
        delta += timedelta(days=1)
    diffs_ms.append(int(delta.total_seconds() * 1000))

# Добавим разницу между Вс и Пн (циклично)
mon = time_objects["Пн"]
sun = time_objects["Вс"]
delta = mon + timedelta(days=1) - sun
if delta.days < 0:
    delta += timedelta(days=1)
diffs_ms.append(int(delta.total_seconds() * 1000))

# Также считаем миллисекунды от начала дня до каждого времени
from_midnight_ms = [int((t - t.replace(hour=0, minute=0)).total_seconds() * 1000) for t in sorted_times]

# Выводим всё в одну строку
print("Разницы между днями в мс:", diffs_ms)
print("От начала дня до времени в мс:", from_midnight_ms)
