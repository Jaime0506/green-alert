interface InputImagesProps {
    isVisible: boolean
    onChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputImages = ({ isVisible, onChangeFile }: InputImagesProps) => {

    if (!isVisible) return null

    return (
        <main className="flex w-full flex-col flex-wrap items md:flex-nowrap mb-6 md:mb-0 gap-4 text-left">
            <section className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 h-[110px]">
                    <div className="flex flex-col items-center justify-center">
                        <svg className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" multiple onChange={onChangeFile} />
                </label>
            </section>
        </main>
    )
}
