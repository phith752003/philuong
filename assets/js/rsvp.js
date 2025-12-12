(function () {
    // Sử dụng Google Sheets nếu có config, nếu không fallback về JSON
    const USE_GOOGLE_SHEETS = window.WEDDING_CONFIG && window.WEDDING_CONFIG.apiUrl && !window.WEDDING_CONFIG.apiUrl.includes('PASTE_YOUR');
    const DATA_URL = 'data/guests.json';

    const state = {
        guests: [],
        events: {},
        selectedGuestId: null,
        isLoading: false
    };

    const elements = {
        form: document.getElementById('search-form'),
        input: document.getElementById('search-input'),
        errorBox: document.querySelector('.errors'),
        successBox: document.querySelector('.search-response-success'),
        errorSection: document.querySelector('.search-response-error'),
        errorText: document.querySelector('.text-search-error-message'),
        resultsContainer: document.querySelector('.list-guest-container'),
        viewButton: document.querySelector('.btn-view-invitation'),
        invitationPanel: document.getElementById('invitation-panel'),
        guestName: document.getElementById('selected-guest-name'),
        guestNote: document.getElementById('selected-guest-note'),
        eventList: document.getElementById('guest-events'),
        confirmationForm: document.getElementById('confirmation-form'),
        attendanceSelect: document.getElementById('attendance-status'),
        plusOneSelect: document.getElementById('plus-one'),
        messageInput: document.getElementById('guest-message'),
        statusMessage: document.querySelector('.status-message')
    };

    const normalizeText = (value) =>
        value
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim();

    function setError(message) {
        elements.errorBox.textContent = message || '';
    }

    function resetResults() {
        elements.resultsContainer.innerHTML = '';
        elements.successBox.classList.add('d-none');
        elements.errorSection.classList.add('d-none');
        elements.viewButton.classList.remove('is-active');
        elements.viewButton.setAttribute('disabled', 'disabled');
        state.selectedGuestId = null;
        hideInvitationPanel();
    }

    function hideInvitationPanel() {
        elements.invitationPanel.classList.add('d-none');
        elements.statusMessage.textContent = '';
        elements.confirmationForm.reset();
    }

    function showResults(results) {
        if (!results.length) {
            elements.errorSection.classList.remove('d-none');
            elements.errorText.textContent = 'Không tìm thấy bạn trong danh sách khách mời. Thử nhập tên khác hoặc liên hệ Phi & Lương nhé!';
            elements.successBox.classList.add('d-none');
            elements.resultsContainer.innerHTML = '';
            elements.viewButton.classList.remove('is-active');
            elements.viewButton.setAttribute('disabled', 'disabled');
            return;
        }

        const html = results
            .map((guest) => {
                const guestEvents = guest.eventIds
                    .map((id) => state.events[id]?.name || '')
                    .filter(Boolean)
                    .join(', ');
                const meta = [
                    guest.code ? `Mã khách: ${guest.code}` : null,
                    guestEvents ? `Sự kiện: ${guestEvents}` : null
                ]
                    .filter(Boolean)
                    .join(' • ');

                return `
                    <label class="guest-option" for="${guest.id}">
                        <input type="radio" name="guestID" id="${guest.id}" value="${guest.id}">
                        <div>
                            <div class="fw-semibold">${guest.name}</div>
                            <div class="guest-meta">${meta}</div>
                        </div>
                    </label>
                `;
            })
            .join('');

        elements.resultsContainer.innerHTML = html;
        elements.successBox.classList.remove('d-none');
        elements.errorSection.classList.add('d-none');
        elements.viewButton.classList.remove('is-active');
        elements.viewButton.setAttribute('disabled', 'disabled');
    }

    function renderInvitation(guest) {
        if (!guest) {
            hideInvitationPanel();
            return;
        }

        elements.guestName.textContent = guest.name;
        elements.guestNote.textContent = guest.note || 'Khách mời đặc biệt của Phi & Lương';

        const eventCards = guest.eventIds
            .map((id) => {
                const event = state.events[id];
                if (!event) {
                    return '';
                }
                return `
                    <label class="event-card">
                        <input type="checkbox" name="eventSelections" value="${event.id}" checked>
                        <div class="event-details">
                            <strong>${event.name}</strong>
                            <span>${event.time}</span>
                            <span>${event.date}</span>
                            <span>${event.location}</span>
                        </div>
                    </label>
                `;
            })
            .join('');

        elements.eventList.innerHTML = eventCards || '<p>Khách mời chưa được gán sự kiện cụ thể.</p>';
        elements.invitationPanel.classList.remove('d-none');
        elements.statusMessage.textContent = '';
    }

    function handleSearch(event) {
        event.preventDefault();
        const term = normalizeText(elements.input.value || '');

        if (!term) {
            setError('Vui lòng nhập Tên, Số điện thoại hoặc Mã khách mời.');
            resetResults();
            return;
        }

        setError('');

        const results = state.guests.filter((guest) => {
            const normalizedName = normalizeText(guest.name);
            const normalizedCode = normalizeText(guest.code || '');
            const normalizedPhone = normalizeText(guest.phone || '');
            return (
                normalizedName.includes(term) ||
                normalizedCode.includes(term) ||
                normalizedPhone.includes(term)
            );
        });

        showResults(results);
    }

    function handleGuestSelection(event) {
        if (event.target.name !== 'guestID') {
            return;
        }
        state.selectedGuestId = event.target.value;
        elements.viewButton.classList.add('is-active');
        elements.viewButton.removeAttribute('disabled');
        document.querySelectorAll('.guest-option').forEach((label) => label.classList.remove('is-selected'));
        const selectedLabel = event.target.closest('.guest-option');
        if (selectedLabel) {
            selectedLabel.classList.add('is-selected');
        }
    }

    function handleViewInvitation(event) {
        event.preventDefault();
        if (!state.selectedGuestId) {
            return;
        }
        const guest = state.guests.find((item) => item.id === state.selectedGuestId);
        if (!guest) {
            return;
        }
        // Chuyển sang trang thiệp mời với thông tin khách
        const params = new URLSearchParams({
            guestId: guest.id,
            guestName: guest.name,
            guestCode: guest.code || '',
            guestNote: guest.note || '',
            eventIds: guest.eventIds.join(',')
        });
        // Sử dụng thiệp mời tùy chỉnh mới
        window.location.href = `thiepmoi-custom.html?${params.toString()}`;
    }

    function handleConfirmation(event) {
        event.preventDefault();
        if (!state.selectedGuestId) {
            elements.statusMessage.textContent = 'Vui lòng chọn khách mời trước.';
            elements.statusMessage.className = 'status-message error';
            return;
        }

        const attendance = elements.attendanceSelect.value;
        const plusOne = elements.plusOneSelect.value;
        const message = elements.messageInput.value.trim();
        const selectedEvents = Array.from(
            elements.eventList.querySelectorAll('input[name="eventSelections"]:checked')
        ).map((input) => input.value);

        if (!attendance) {
            elements.statusMessage.textContent = 'Vui lòng chọn trạng thái tham dự.';
            elements.statusMessage.className = 'status-message error';
            return;
        }

        if (!selectedEvents.length) {
            elements.statusMessage.textContent = 'Vui lòng chọn ít nhất một sự kiện tham dự.';
            elements.statusMessage.className = 'status-message error';
            return;
        }

        const guest = state.guests.find((item) => item.id === state.selectedGuestId);
        
        // Nếu dùng Google Sheets, gửi dữ liệu lên
        if (USE_GOOGLE_SHEETS) {
            saveToGoogleSheets({
                guestId: guest.id,
                guestName: guest.name,
                attendance,
                plusOne: parseInt(plusOne),
                message,
                selectedEvents
            });
        } else {
            // Fallback: chỉ log console
            console.table({
                guest: guest?.name || '',
                attendance,
                plusOne,
                message,
                selectedEvents
            });
            
            elements.statusMessage.textContent = 'Cảm ơn bạn đã xác nhận. Hẹn gặp bạn trong ngày vui của Phi & Lương!';
            elements.statusMessage.className = 'status-message success';
            elements.confirmationForm.reset();
        }
    }

    function loadFromGoogleSheets() {
        if (state.isLoading) return;
        
        state.isLoading = true;
        const apiUrl = window.WEDDING_CONFIG.apiUrl + '?action=getData';
        
        fetch(apiUrl)
            .then((response) => response.json())
            .then((result) => {
                if (result.success && result.data) {
                    state.guests = result.data.guests || [];
                    state.events = (result.data.events || []).reduce((acc, event) => {
                        acc[event.id] = event;
                        return acc;
                    }, {});
                    console.log('✅ Đã tải dữ liệu từ Google Sheets:', state.guests.length, 'khách mời');
                } else {
                    throw new Error(result.message || 'Failed to load data');
                }
            })
            .catch((error) => {
                console.error('❌ Lỗi khi tải từ Google Sheets:', error);
                setError('Không thể tải dữ liệu khách mời. Vui lòng thử lại sau.');
                // Fallback to JSON
                loadFromJSON();
            })
            .finally(() => {
                state.isLoading = false;
            });
    }

    function loadFromJSON() {
        fetch(DATA_URL)
            .then((response) => response.json())
            .then((data) => {
                state.guests = data.guests || [];
                state.events = (data.events || []).reduce((acc, event) => {
                    acc[event.id] = event;
                    return acc;
                }, {});
                console.log('📄 Đã tải dữ liệu từ JSON:', state.guests.length, 'khách mời');
            })
            .catch(() => {
                setError('Không thể tải dữ liệu khách mời. Vui lòng thử lại sau.');
            });
    }

    function loadData() {
        if (USE_GOOGLE_SHEETS) {
            console.log('🔄 Đang tải dữ liệu từ Google Sheets...');
            loadFromGoogleSheets();
        } else {
            console.log('📁 Đang tải dữ liệu từ file JSON local...');
            loadFromJSON();
        }
    }

    function saveToGoogleSheets(confirmationData) {
        const submitButton = elements.confirmationForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Đang gửi...';
        submitButton.disabled = true;
        
        // Dùng GET request thay vì POST để tránh CORS
        const params = new URLSearchParams({
            action: 'saveConfirmation',
            guestId: confirmationData.guestId || '',
            guestName: confirmationData.guestName || '',
            attendance: confirmationData.attendance || '',
            plusOne: confirmationData.plusOne || 0,
            message: confirmationData.message || '',
            selectedEvents: confirmationData.selectedEvents ? confirmationData.selectedEvents.join(', ') : ''
        });
        
        const apiUrl = window.WEDDING_CONFIG.apiUrl + '?' + params.toString();
        
        fetch(apiUrl)
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                elements.statusMessage.textContent = '✅ Đã lưu xác nhận tham dự! Cảm ơn bạn. Hẹn gặp trong ngày vui của Phi & Lương!';
                elements.statusMessage.className = 'status-message success';
                elements.confirmationForm.reset();
                
                console.log('✅ Đã gửi xác nhận lên Google Sheets:', confirmationData);
                console.log('📊 Response:', result);
            } else {
                throw new Error(result.message || 'Failed to save');
            }
        })
        .catch((error) => {
            console.error('❌ Lỗi khi lưu:', error);
            elements.statusMessage.textContent = '⚠️ Có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ Phi & Lương.';
            elements.statusMessage.className = 'status-message error';
        })
        .finally(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
    }

    function init() {
        if (!elements.form) {
            return;
        }
        loadData();
        elements.form.addEventListener('submit', handleSearch);
        elements.resultsContainer.addEventListener('change', handleGuestSelection);
        elements.viewButton.addEventListener('click', handleViewInvitation);
        elements.confirmationForm.addEventListener('submit', handleConfirmation);
    }

    init();
})();

