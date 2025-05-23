import React, { useState } from 'react';

export const Dashboard = () => {
    const [peserta, setPeserta] = useState([
        { nama: 'Peserta 1', hadir: true },
        { nama: 'Peserta 2', hadir: true },
        { nama: 'Peserta 3', hadir: true },
        { nama: 'Peserta 4', hadir: true },
    ])

    const [meja, setMeja] = useState(4);

    const total = peserta.length;
    const hadir = peserta.filter(p => p.hadir).length;
    const tidakHadir = total - hadir;

    const handleTambahMeja = () => setMeja(prev => prev + 1);
    const handleKurangiMeja = () => setMeja(prev => (prev > 1 ? prev - 1 : 1));
    const handlePrint = () => window.print();

    const handleTambahPeserta = () => {
        setPeserta([...peserta, { nama: `Peserta ${peserta.length + 1}`, hadir: true }]);
    }

    const toggleHadir = index => {
        const updated = [...peserta];
        updated[index].hadir = !updated[index].hadir;
        setPeserta(updated);
    }

    const arrangedPeserta = React.useMemo(() => {
        const result = [];
        const listHadir = peserta.filter(p => p.hadir);
        const totalKursi = meja * 4;

        for (let i = 0; i < totalKursi; i++) {
            result[i] = listHadir[i] || null;
        }

        return result;
    }, [peserta, meja]);

    const handleGantiNama = (index, value) => {
        const updated = [...peserta];
        updated[index].nama = value;
        setPeserta(updated);
    }

    return (
        <div className='p-6'>
            <div className='grid grid-cols-3 gap-4 mb-6'>
                <div className='bg-blue-100 p-4 rounded shadow text-center'>
                    <h2 className='text-xl font-bold'>Total Peserta</h2>
                    <p className='text-2xl'>{total}</p>
                </div>
                <div className='bg-green-100 p-4 rounded shadow text-center'>
                    <h2 className='text-xl font-bold'>Hadir</h2>
                    <p className='text-2xl'>{hadir}</p>
                </div>
                <div className='bg-red-100 p-4 rounded shadow text-center'>
                    <h2 className='text-xl font-bold'>Tidak Hadir</h2>
                    <p className='text-2xl'>{tidakHadir}</p>
                </div>
            </div>
            <div className='flex flex-col lg:flex-row gap-6'>
                <div className='flex-1'>
                    <div clasName='mb-4 flex items-center gap-3 pb-3'>
                        <button onClick={handleTambahMeja} className='bg-blue-600 text-white mr-2 px-4 py-2 rounded hover:bg-blue-700 righ-2'>
                            Tambah Meja
                        </button>
                        <button onClick={handleKurangiMeja} className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>
                            Kurangi Meja
                        </button>
                        <span
                            className='bg-gray-200 ml-2 text-gray-800 px-4 py-2 rounded border text-sm font-medium'
                        >    Total Meja: {meja}
                        </span>
                    </div>

                    <div className='grid grid-cols-1 mt-5 sm:grid-cols-2 md:grid-cols-4 gap-4 print:grid-cols-4'>
                        {Array.from({ length: meja }).map((_, mejaIndex) => (
                            <div key={mejaIndex} className='border p-4 rounded shadow'>
                                <h3 className='text-center font-semibold mb-2'>Meja {mejaIndex + 1}</h3>
                                <div className='grid grid-cols-2 gap-2'>
                                    {Array.from({ length: 4 }).map((_, kursiIndex) => {
                                        const peserta = arrangedPeserta[mejaIndex * 4 + kursiIndex]

                                        return (
                                            <div
                                                key={kursiIndex}
                                                className={`p-2 rounded text-sm text-center border ${peserta ? peserta.hadir ? 'bg-green-200' : 'bg-red-200' : 'bg-gray-100'}`}>
                                                {peserta ? peserta.nama : 'kosong'}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                        ))}
                    </div>
                    <div className="mt-6">
                        <button onClick={handlePrint} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Cetak Layout
                        </button>
                    </div>
                </div>
                <div className='w-full lg:w-80 flex-shrink-0'>
                    <div className='flex justify-between items-center mb-3'>
                        <h2 className='text-lg font-semibold'>Daftar Peserta</h2>
                        <button onClick={handleTambahPeserta} className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'>
                            + Tambah
                        </button>
                    </div>
                    <div className="space-y-3">
                        {peserta.map((p, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 border rounded bg-white shadow-sm">
                                <input type='text' value={p.nama} onChange={e => handleGantiNama(index, e.target.value)} className='flex-grow border rounded px-2 py-1 text-sm' />
                                <button onClick={() => toggleHadir(index)} className={`text-xs px-2 py-1 rounded ${p.hadir ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                    {p.hadir ? 'Hadir' : 'Tidak'}
                                </button>
                                <button onClick={() => {
                                    const updated = [...peserta];
                                    updated.splice(index, 1);
                                    setPeserta(updated);
                                }}
                                    title='Hapus Peserta' className='text-red-500 hover:text-red-700 ml-1 text-sm font-bold px-2'> &times; </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}    