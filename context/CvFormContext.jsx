"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const STORAGE_KEY = "cv_builder_draft";

const CvFormContext = createContext();

export function CvFormProvider({ children, initial = {} }) {
    const [data, setData] = useState(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : initial;
        } catch {
            return initial;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch {}
    }, [data]);

    function update(partial) {
        setData(prev => ({ ...prev, ...partial }));
    }

    function clearDraft() {
        setData({});
        localStorage.removeItem(STORAGE_KEY);
    }

    return (
        <CvFormContext.Provider value={{ data, update, clearDraft }}>
            {children}
        </CvFormContext.Provider>
    );
}

export function useCvForm() {
    return useContext(CvFormContext);
}
